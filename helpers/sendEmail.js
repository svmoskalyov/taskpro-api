const eeClient = require("elasticemail-webapiclient").client;

const { SENDER_API_KEY, SENDER_EMAIL } = process.env;

const options = {
  apiKey: SENDER_API_KEY,
  apiUri: "https://api.elasticemail.com/",
  apiVersion: "v2",
};

// eslint-disable-next-line new-cap
const EE = new eeClient(options);

const sendEmail = async ({ to, subject, html }) => {
  const emailParams = {
    from: SENDER_EMAIL,
    fromName: "TaskPro support team",
    to,
    subject,
    body: html,
  };

  await EE.Email.Send(emailParams);
  return true;
};

module.exports = sendEmail;
