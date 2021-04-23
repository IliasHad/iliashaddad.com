var axios = require("axios");

exports.handler = function (event, context, callback) {
  const contentAPIKey = event.queryStringParameters.api;

  // Only allow POST
  if (
    event.httpMethod !== "POST" &&
    contentAPIKey === process.env.CONTENT_API_KEY
  ) {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  if (contentAPIKey === process.env.CONTENT_API_KEY) {
    var data = JSON.stringify({
      event_type: "post_published",
    });

    var config = {
      method: "post",
      url: "https://api.github.com/repos/IliasHad/iliashaddad.com/dispatches",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(null, {
          statusCode: 200,
          body: "Done :)",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
