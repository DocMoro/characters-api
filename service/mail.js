const nodemailer = require('nodemailer');

const { NODE_ENV, API_URL } = process.env;
const { DEV_URL } = require('../utils/constants');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'prcharapi@mail.ru',
        pass: '7A7JKX8yU3WMCLYaTshw',
      },
    });
  }

  async sendActivationMail(to, link) {
    const url = `${NODE_ENV === 'production' ? API_URL : DEV_URL}activate/${link}`;

    await this.transporter.sendMail({
      from: 'prcharapi@mail.ru',
      to,
      subject: 'Активация аккаунта',
      text: '',
      html:
          `<div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${url}">${url}</a>
          </div>`,
    });
  }
}

module.exports = new MailService();
