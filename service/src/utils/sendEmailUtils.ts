import mailgun from "mailgun-js";

interface IProps {
  type: string,
  name: string,
  email: string,
}

export function SendEmailUtils({ type, name, email }: IProps) {
  // function checkEmailType() {
  //   if (messageJson.type === "newUser") {
  //     return newUser(messageJson);
  //   } if (messageJson.type === "resetPassword") {
  //     return resetPassword(messageJson);
  //   } if (messageJson.type === "newBet") {
  //     return newBet(messageJson);
  //   } if (messageJson.type === "newBetAdmin") {
  //     return newBetAdmin(messageJson);
  //   } if (messageJson.type === "reminderToBet") {
  //     return reminderToBet(messageJson);
  //   }

  //   return null;
  // }

  const data = {
    from: "Luby Cash <contact@lubycash.com>",
    to: `${name} <${email}>`,
    subject: messageJson.subject,
    html: checkEmailType(),
  };

  mailgun({
    apiKey: "a93249d9900ec333256ed2086c26463f-0677517f-da8c0a2b",
    domain: "sandboxb1cae3899351431da3d46fda396ec618.mailgun.org",
  }).messages().send(data, (error) => {
    console.log(error || `E-mail enviado, ${messageJson.email}`);
  });
}
