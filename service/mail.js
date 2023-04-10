const nodemailer = require('nodemailer');

const { NODE_ENV, API_URL } = process.env;
const { DEV_URL } = require('../utils/constants');

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'prcharapi@mail.ru',
        pass: 'ddac62tCxT3uxvq4CR9d'
      }
    })
  }

  async sendActivationMail(to, link) {
    link = `${NODE_ENV === 'production' ? API_URL : DEV_URL}activate/${link}`

    await this.transporter.sendMail({
      from: 'prcharapi@mail.ru',
      to,
      subject: 'Активация аккаунта',
      text: '',
      html:
          `<div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>`
    })
  }
}

module.exports = new mailService();
