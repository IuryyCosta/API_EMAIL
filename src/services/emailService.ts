import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER ,
    pass: process.env.EMAIL_PASSWORD ,
  },
});

export const sendEmail = async (to: string, subject: string, body: string): Promise<void> => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to : process.env.EMAIL_USER ,
      subject : "Comparativo dos Antendimento enviados",
      text: body,
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail');
  }
};
