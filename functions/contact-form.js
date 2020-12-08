var sendpulse = require("sendpulse-api");

const contactAddress = process.env.EMAIL;

exports.handler = function (event, context, callback) {
  const { data } = JSON.parse(event.body);
  console.log(data);
  const subject = `New ${data.projectType} Project with ${data.budget}`;

  sendpulse.init(
    process.env.API_USER_ID,
    process.env.API_SECRET,
    process.env.TOKEN_STORAGE
  );

  var email = {
    html:
      `  
    <h2> ${data.projectType} - ${data.budget} </h2>
    <p>${data.message}</p>
  <br>
  This email sent by  ${data.name}  - ${data.email}
  ` || "[No message]",
    text:
      `  
 ${data.projectType} - ${data.budget} 
  ${data.message}

This email sent by  ${data.name}  - ${data.email}
` || "[No message]",
    subject: subject,
    from: {
      name: data.name,
      email: data.email,
    },
    to: [
      {
        name: "Ilias Haddad",
        email: contactAddress,
      },
    ],
  };

  sendpulse.smtpSendMail(function (error, info) {
    if (error) {
      callback(JSON.parse(error));
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      });
    }
  }, email);
};
