import { Request, Response } from 'express';
import { executeQuery } from '../services/databaseService';
import { sendEmail } from '../services/emailService';
import dotenv from 'dotenv';


dotenv.config();

export const handleQueryAndEmail = async (req: Request, res: Response): Promise<void> => {

    const email = process.env.EMAIL_USER;
    const formattedEmail = JSON.stringify(email,null,2);

    console.log(formattedEmail);

    const subject = process.env.SUBJECT_EMAIL

    if(!email){
      res.status(400).send({message: 'O e-mail é obrigatório'});
      console.log('dentro do handle')
      return;
    }

    try{
      const result = await executeQuery();
      console.log('Executado query');

      // Formatando os resultados em texto para o corpo do e-mail
      const formattedResults = JSON.stringify(result,null,2);
      // Fortando Assunto do e-mail
      const formattedSubject = JSON.stringify(subject,null,2);
      
      //enviando e-mail
      try{
        await sendEmail(formattedEmail, formattedSubject, formattedResults);
        res.status(200).json({message : 'Consulta executada e e-mail enviado com sucesso!'});
      }catch(error){
        console.error('Erro ao enviar o e-mail:', error);
        res.status(500).json({error : 'Erro ao enviar o e-mail'});

      };
    
    } catch(queryError){
      console.error('Erro ao executar a query:', queryError);
      res.status(500).json({error: 'Erro ao executar a query'});
    };
};



