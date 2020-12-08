const nodemailer = require("nodemailer");

const contactAddress = process.env.EMAIL;
const mailer = nodemailer.createTransport({
  service: "SendPulse", // no need to set host or port etc.
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.handler = function (event, context, callback) {
  const { data } = JSON.parse(event.body);
  console.log(data);
  const subject = `New ${data.projectType} Project with ${data.budget}`;
  mailer.sendMail(
    {
      from: data.email,
      to: [contactAddress],
      subject: subject || "[No subject]",
      html:
        `  
        <h2> ${data.projectType} - ${data.budget} </h2>
        <p>${data.message}</p>
      <br>
      This email sent by  ${data.name}  - ${data.email}
      ` || "[No message]",
    },
    function (error, info) {
      if (error) {
        callback(error);
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        });
      }
    }
  );
};
