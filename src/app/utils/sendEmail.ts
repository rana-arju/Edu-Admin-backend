import nodemailer from 'nodemailer';
import config from '../config';
import AppError from '../errors/AppError';

export const sendEmail = async (to: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: config.node_env === 'production',
      auth: {
        user: config.email_user,
        pass: config.email_pass,
      },
    });

    await transporter.sendMail({
      from: config.email_user, // sender address
      to, // list of receivers
      subject: 'Reset your password within ten mins!', // Subject line
      text: '', // plain text body
      html, // html body
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new AppError(400, error);
  }
};
