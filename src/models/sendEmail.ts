import { executeQuery } from '../services/databaseService';
import { sendEmail } from '../services/emailService';
import dotenv from 'dotenv';

dotenv.config();

// Função genérica para executar a lógica
export const handleQueryAndEmailInternal = async (): Promise<void> => {
  const email = process.env.EMAIL_USER;
  const subject = process.env.SUBJECT_EMAIL;

  if (!email) {
    console.error('O e-mail é obrigatório');
    throw new Error('E-mail não configurado.');
  }

  try {
    const result = 'Teste handleQueryAndEmailInternal'// await executeQuery();
    console.log('Query executada com sucesso.');

    const formattedEmail = JSON.stringify(email, null, 2);
    const formattedResults = JSON.stringify(result, null, 2);
    const formattedSubject = JSON.stringify(subject, null, 2);

    await sendEmail(formattedEmail, formattedSubject, formattedResults);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao processar consulta ou enviar e-mail:', error);
    throw error;
  }
};
