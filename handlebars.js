
const path = require('path')
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const sendMail = (data)=>{
var transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "tech@bundle-media.co",
        pass: "8Oajr0HI2fhXvKE7",
      },
  });

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve('./views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: ".handlebars",
}

transporter.use('compile', hbs(handlebarOptions));

var mailOptions = {
  from: 'tech@bundle-media.co',
  to: "sahnawazhussain852@gmail.com",
  subject: 'Sending Email using Node.js',
  template: 'email',
  context: {
    title: 'Thanks for contacting bundle-media',
    text: "My team will back to you soon."
  }

};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}
module.exports = {sendMail}

