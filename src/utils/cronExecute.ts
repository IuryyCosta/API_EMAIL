import dotenv from 'dotenv';
import { handleQueryAndEmailInternal } from '../models/sendEmail';

dotenv.config();

export const timeExecute = ()=>{
    console.log('Executando o TimeExecute ')
    const start = new Date() ;
    const hours = start.getHours();
    const minutes = start.getMinutes();

    try{
        // Carrega e valida os horários 
        const horarios = JSON.parse(process.env.HORARIOS || '[]');

        if(!Array.isArray(horarios)){
            throw new Error('Horários inválidos')
        }

        //Verifica se algum horário corresponde ao horário atual
        const deveExecutar = horarios.some(
            (horario) => Number(horario.hours) === hours && Number(horario.minutes) === minutes
        );

        if(deveExecutar){
            
            consultarAPI();
        }
    
    }catch(timeError){
        console.error('Erro ao verificar horário:', timeError);
    }
}


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