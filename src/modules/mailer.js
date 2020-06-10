const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { nodemailerConfig } = require('../config.json');

const transporter = nodemailer.createTransport(nodemailerConfig);

transporter.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: path.resolve('./src/resources/mail'),
        layoutsDir: path.resolve('./src/resources/mail'),
        defaultLayout: '',
    },
    viewPath: path.resolve('./src/resources/mail'),
    extName: '.html'
}));

module.exports = transporter;