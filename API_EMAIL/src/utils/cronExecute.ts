import dotenv from 'dotenv';

import { handleQueryAndEmailInternal } from '../models/sendEmail';

dotenv.config();

export const timeExecute = () => {
    console.log('Executando o TimeExecute');
    const start = new Date();
    const hours = start.getHours();
    const minutes = start.getMinutes();

    console.log('Hora atual:', { hours, minutes });

    try {
        //console.log('Carregando e validando os horários');

        // Carrega e valida os horários a partir do arquivo `.env`
        const horarios = JSON.parse(process.env.HORARIOS || '[]');

        //console.log('Horários carregados:', horarios);

       // console.log('Validando se é um array');
        if (!Array.isArray(horarios)) {
            throw new Error('Horários inválidos: não é um array');
        }

       // console.log('Verificando se o horário atual corresponde a algum no array');

        // Verifica se algum horário corresponde ao horário atual
        const deveExecutar = horarios.some((horario) => {
            console.log(
                `Comparando horário: {hours: ${horario.hours}, minutes: ${horario.minutes}}`
            );
            return (
                parseInt(horario.hours, 10) === hours &&
                parseInt(horario.minutes, 10) === minutes
            );
        });

      //  console.log('Deve executar agora:', deveExecutar);

        if (deveExecutar) {
            console.log('Horário correspondente encontrado, consultando API...');
            consultarAPI();
        } else {
            console.log('Nenhum horário corresponde ao horário atual.');
        }
    } catch (timeError) {
        console.error('Erro ao verificar horários:', timeError);
    }
};


function consultarAPI(){
    console.log("Consultar API....");
    handleQueryAndEmailInternal()
    .then(()=>{
        console.log('Email enviado com sucesso');
    })
    .catch((error)=>{
        console.error('Erro no processo',error)
    });

}