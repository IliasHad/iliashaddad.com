const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
  service: "SendPulse", // no need to set host or port etc.
  auth: {
    pass: process.env.EMAIL_PASSWORD,
    user: process.env.EMAIL_ADDRESS,
  },
});

exports.handler = function (event, context, callback) {
  const { data } = JSON.parse(event.body);
  console.log(data);
  const subject = `New ${data.projectType} Project with ${data.budget}`;
  mailer.sendMail(
    {
      from: "contact@iliashaddad.com",
      to: "contact@iliashaddad.com",
      subject: subject || "[No subject]",
      html:
        `  
        <h2> ${data.projectType} - ${data.budget} </h2>
        <p>${data.message}</p>
      <br>
      This email sent by  ${data.name}  - ${data.email}
      ` || "[No message]",
    },
    function (error) {
      if (error) {
        callback(error);
      } else {
        mailer.sendMail(
          {
            from: "contact@iliashaddad.com",
            to: data.email,
            subject: `${subject} - Iliashaddad.com`,
            html:
              `  
              <h1>Confirmation Email</h1>
              <p>Hi ${data.name}, Thank you for your submitting your project. I'll check your project and get back to you within 24-48 hrs.</p>
              <p>Here's your project details:</p>
              <h2> ${data.projectType} - ${data.budget} </h2>
              <p>${data.message}</p>
              <p>You can schedule a discovery call to discuss your project. <a href="https://calendly.com/iliashaddad/discovery-call">Here's my availability </a> </p>
            <br>            `,
          },
          function (error) {
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
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({ success: true }),
        });
      }
    }
  );
};
