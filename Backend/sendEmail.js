// import * as nodemailer from 'nodemailer';

// // async..await is not allowed in global scope, must use a wrapper
// export const sendEmail = async (email: string, link: string) => {


//   console.log("\n\n\nInside Send Email.......\n\n\n\n")
//   // create reusable transporter object using the default SMTP transport
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.sendgrid.net',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: 'apikey', // generated ethereal user
//       pass: process.env.SENDGRID_API_KEY, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: 'debabratamukherjee@trakinvest.com', // sender address
//     to: email, // list of receivers
//     subject: 'GroupUser Creation Formation ✔', // Subject line
//     text: 'Please Use this link to Confirm your email?', // plain text body
//     html: `<b>Please Use this link to Confirm your email?</b> <a href="${link}">confirm Email</a>`, // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// };


// import { HttpException,HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
const hbs = require('nodemailer-handlebars')

// async..await is not allowed in global scope, must use a wrapper
 const sendEmail = async (email, link)  => {
  if(email.length != 0 && link.length != 0){
  // create reusable transporter object using the default SMTP transport
  const transporter = await nodemailer.createTransport({
    host:'smtp.sendgrid.net'
    ,
    port: 465
    ,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
  });

  await transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}));

  // send mail with defined transport object
  // const info = await transporter.sendMail({
  //   from: 'debabratamukherjee@trakinvest.com', // sender address
  //   to: email, // list of receivers
  //   subject: 'GroupUser Creation ConfirmationMail ✔', // Subject line
  //   text: 'Please Use this link to Confirm your email?', // plain text body
  //   html: `<b>Please Use this link to Confirm your email?</b> <a href="${link}">confirm Email</a>`, // html body
  //   template: 'index',
  //   context: {
  //       name: 'Accime Esterling'
  //   }
  // });

  let mailOptions = {
    from: 'debabratamukherjee@trakinvest.com', // sender address
    to: email, // list of receivers
    subject: 'GroupUser Creation ConfirmationMail ✔', // Subject line
    text: 'Please Use this link to Confirm your email?', // plain text body
    html: `<b>Please Use this link to Confirm your email?</b> <a href="${link}">confirm Email</a>`, // html body
    template: 'index',
    context: {
        name: 'Accime Esterling'
    }
  }

  var sent = await new Promise(async function(resolve, reject) {
    return await transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {      
          console.log('Message sent: %s', error);
          return reject(false);
        }
        console.log('Message sent: %s', info.messageId);
        resolve(true);
    });      
  });
  return sent;
}
else{
  return false;
}

  // console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
module.exports={sendEmail}