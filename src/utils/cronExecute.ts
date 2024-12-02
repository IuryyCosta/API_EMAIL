import dotenv from 'dotenv';

dotenv.config();

export const timeExecute = ()=>{
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
    console.log("Consultar API....")
}