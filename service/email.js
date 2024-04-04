require('dotenv').config();
const nodemailer = require('nodemailer');

const user = process.env.user;
const pass = process.env.pass;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
})

module.exports = transporter;
