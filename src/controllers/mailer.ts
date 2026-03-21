import { FastifyRequest, FastifyReply } from 'fastify';
import nodemailer from 'nodemailer';
import { messages } from '../utils/constants';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'localhost',
  port: Number(process.env.SMTP_PORT) || 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = (request: FastifyRequest<{ Body: { name: string; to: string; message: string } }>, reply: FastifyReply): void => {
  const { name, to, message } = request.body;

  const mailData = {
    from: process.env.SMTP_USER,
    to: to,
    subject: `Portfolio Contact from ${name}`,
    text: message,
    html: `<b>Name:</b> ${name}<br><b>Message:</b> ${message}`,
  };

  request.log.info(mailData, 'mailData: ');

  transporter.sendMail(mailData, (error: Error | null, info: any) => {
    if (error) {
      return reply.code(500).send({
        status: messages.FAIL_STATUS,
        message: 'Internal server error',
        error: error.message,
      });
    }

    return reply.code(200).send({
      status: messages.SUCCESS_STATUS,
      message: 'Mail sent successfully',
      messageId: info.messageId,
    });
  });
};
