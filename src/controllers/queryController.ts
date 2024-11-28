import { Request, Response } from 'express';
import { executeQuery } from '../services/databaseService';
import { sendEmail } from '../services/emailService';

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

    // Envia os resultados por e-mail
    await sendEmail(email, 'Resultados da Consulta ', formattedResults);

    res.status(200).json({ message: 'Consulta executada e e-mail enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    res.status(500).json({ error: 'Erro ao executar a consulta ou enviar o e-mail.' });
  } 
};
