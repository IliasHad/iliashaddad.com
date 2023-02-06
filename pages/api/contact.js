// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "SendPulse", // no need to set host or port etc.
  auth: {
    pass: process.env.EMAIL_PASSWORD,
    user: process.env.EMAIL_ADDRESS,
  },
});

export default function handler(req, res) {
  console.log(req.body)
  const { data } = req.body;
  console.log(data)
  const subject = `New ${data.projectType} Project with ${data.budget}`;
  console.log(subject)
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
        res.status(500).json({
          success: false
        })
      } else {
        mailer.sendMail(
          {
            from: "contact@iliashaddad.com",
            to: data.email,
            subject: `Confirmation Email - Iliashaddad.com`,
            html:
              `  
              <h1>Confirmation Email</h1>
              <p>Hi ${data.name}, Thank you for your submitting your project. I'll check your project and get back to you within 24-48 hrs.</p>
              <p>Here's your project details:</p>
              <h2> ${data.projectType} - ${data.budget} </h2>
              <p>${data.message}</p>
              <p>You can schedule a discovery call to discuss your project. <a href="https://calendly.com/iliashaddad/discovery-call">Here's my availability </a> </p>

              <p>Thank you, <br> Ilias Haddad</p>
            <br>            `,
          },
          function (error) {
            if (error) {
              res.status(500).json({
                success: false
              })
            } else {
              res.status(200).json({
                success: true
              })
            }
          }
        );

      }
    }
  );

}
