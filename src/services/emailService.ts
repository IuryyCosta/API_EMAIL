import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ,
  port: Number(process.env.EMAIL_PORT) ,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER ,
    pass: process.env.EMAIL_PASSWORD ,
  },
});

export const sendEmail =  (to: string, subject: string, body: string) : void=> {
  try {
     transporter.sendMail({
      from: process.env.EMAIL_USER,
      to :process.env.EMAIL_USER,
      subject : subject,
      text: body,
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail');
  }
};
