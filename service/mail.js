const nodemailer = require('nodemailer');

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      auth: {
        user: 'prcharmail@gmail.com',
        pass: 'rootroot'
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: 'prcharmail@gmail.com',
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
