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
  const subject = `New ${req.body.projectType} Project with ${req.body.budget}`;

  mailer.sendMail(
    {
      from: req.body.email,
      to: [contactAddress],
      subject: subject || "[No subject]",
      html:
        `  
        <h2> ${req.body.projectType} - ${req.body.budget} </h2>
        <p>${req.body.message}</p>
      <br>
      This email sent by ${req.body.email}
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
