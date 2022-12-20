"use strict";
const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail = (email) => {
    console.log('---------------------DENTRO---------sendWelcomeEmail----------------- WELLCOME DE EMAIL *********************************************************');
    console.log(email, typeof process.env.EMAIL_EMPRESA);
    sgMail.send({
        to: email,
        // from: 'roberto.alonso.gandia@gmail.com',
        from: process.env.EMAIL_EMPRESA,
        subject: 'Primer email',
        text: `Bienvenido a la aplicación. Deseamos disfrute de su experiencia con nosotros`
    });
};
const sendCancelationEmail = (email, name) => {
    console.log('--------------------sendCancelationEmail--------------------------- CANCELACION DE EMAIL *********************************************************');
    console.log(email, name, 'roberto.alonso.gandia@gmail.com');
    sgMail.send({
        to: email,
        // from: 'roberto.alonso.gandia@gmail.com',
        from: process.env.EMAIL_EMPRESA,
        subject: 'Sentimos que abndone nuestra aplicación',
        text: `Goodbye, ${name}. Esperamos que vuelva pronto de nuevo`
    });
};
module.exports = { sendWelcomeEmail, sendCancelationEmail
};
