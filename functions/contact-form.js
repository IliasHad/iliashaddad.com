const nodemailer = require("nodemailer");

const contactAddress = process.env.EMAIL;
const mailer = nodemailer.createTransport({
  service: "gmail", //smtp.gmail.com  //in place of service use host...
  secure: false, //true
  port: 25, //465
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);
  const subject = `New ${body.projectType} Project with ${body.budget}`;
  mailer.sendMail(
    {
      from: body.email,
      to: [contactAddress],
      subject: subject || "[No subject]",
      html:
        `  
        <h2> ${body.projectType} - ${body.budget} </h2>
        <p>${body.message}</p>
      <br>
      This email sent by ${body.email}
      ` || "[No message]",
    },
    function (error, info) {
      if (error) {
        callback(error);
      } else {
        callback(null, {
          statusCode: 200,
          body: "Ok",
        });
      }
    }
  );
};
