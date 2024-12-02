import nodemailer from "nodemailer";
import dotenv from "dotenv";


// Carrega as variáveis de ambiente
dotenv.config();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  

  host: process.env.EMAIL_HOST,
  port:Number(process.env.EMAIL_PORT),  // Converte a porta para número
  secure: false ,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  logger: true, // Habilitando logs de Detalhados
  debug: true, // Habiilitando informações de Depuração
  connectionTimeout : 10000 // Tempo de conexão
});

/**
 * Envia um e-mail utilizando Nodemailer.
 * @param to - Destinatário do e-mail.
 * @param subject - Assunto do e-mail.
 * @param body - Corpo do e-mail.
 * @throws Lança erro se o envio falhar.
 */
export const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
  if (!to || !subject || !body) {
    throw new Error("Os parâmetros 'to', 'subject' e 'body' são obrigatórios.");
  }

  console.log("Preparando para enviar e-mail:", { to, subject });
    //const sendTo = JSON.stringify(process.env.EMAIL_USER);
    //console.log(sendTo);
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
    });

    console.log("E-mail enviado com sucesso!", {
      messageId: info.messageId,
      to,
    });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error("Erro ao enviar e-mail");
  }
};
