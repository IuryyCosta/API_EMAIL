import { Request, Response } from 'express';
import { executeQuery } from '../services/databaseService';
import { sendEmail } from '../services/emailService';
import { createLog } from '../services/logService';

export const handleComplexQueryAndEmail = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'O e-mail é obrigatório!' });
    return;
  }

  try {
    const results = await executeQuery();

    // Formata os resultados em texto para o corpo do e-mail
    const formattedResults = JSON.stringify(results, null, 2);

    // Tenta enviar o e-mail
    try {
      await sendEmail(email, 'Resultados da Consulta Complexa', formattedResults);
      res.status(200).json({ message: 'Consulta executada e e-mail enviado com sucesso!' });
    } catch (emailError) {
      console.error('Erro ao enviar e-mail:', emailError);

      // Registra o log no banco local
      await createLog(email, `Erro ao enviar e-mail: ${emailError}`);

      res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
    }
  } catch (queryError) {
    console.error('Erro ao processar consulta:', queryError);

    // Registra o log no banco local
    await createLog(email, `Erro ao executar consulta: ${queryError}`);

    res.status(500).json({ error: 'Erro ao executar a consulta.' });
  }
};

export const testEmail = (req: Request, res: Response) => {
  const {to,subject, body} = req.body;
   sendEmail(to, subject, body);

  res.status(200).json()
};
