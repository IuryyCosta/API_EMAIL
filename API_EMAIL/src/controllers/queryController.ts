import { Request, Response } from 'express';
import { executeQuery } from '../services/databaseService';
import { sendEmail } from '../services/emailService';

import dotenv from 'dotenv';

dotenv.config();

export const handleQueryAndEmail = async (req: Request, res: Response): Promise<void> => {

  
  const email = process.env.EMAIL_USER
  const subject = process.env.SUBJECT_EMAIL

   if(!email){
    res.status(400).send({message: 'O e-mail é obrigatório'});
    return;
  }

  try{
    const result =  await executeQuery();
    console.log('Executado query');

   
    // Fortando Assunto do e-mail
    const formattedSubject = JSON.stringify(subject,null,2);

    //enviando e-mail
    try{
      await sendEmail(email, formattedSubject, result);
      res.status(200).json({message : 'Consulta executada e e-mail enviado com sucesso!'});
    }catch(error){
      console.error('H: Erro ao enviar o e-mail:', error);
      res.status(500).json({error : 'Erro ao enviar o e-mail'});

    };
  
  } catch(queryError){
    console.error('Erro ao executar a query:', queryError);
    res.status(500).json({error: 'Erro ao executar a query'});
  }; 

 // res.status(200).json({sucesso: email})
};

export const testEmail = (req: Request, res: Response) => {
  const {to,subject, body} = req.body;
  console.log(to,subject, body)
   sendEmail(to, subject, body);

/*   res.status(200).json({to,subject, body}) */
};
