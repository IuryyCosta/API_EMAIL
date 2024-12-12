import { executeQuery, queryErros, querySucessErro } from "./databaseService";



export const formatEmail =  async () : Promise<string> =>  {

    const result =  await executeQuery();
    const resultSucessErro = await querySucessErro() ;
    const resultDsErro = await queryErros();

    const date = new Date();
    date.setDate(date.getDate()- 1 );
    const formattedDate = date.toLocaleDateString();

   return `${result} \n\n${resultSucessErro} 
                 \n${resultDsErro} \n \n \n 
                 Data da extração : ${formattedDate}`;
   
}