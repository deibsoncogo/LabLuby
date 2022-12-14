import mailgun from "mailgun-js";
import { newBet } from "./emails/newBet";
import { newBetAdmin } from "./emails/newBetAdmin";
import { newUser } from "./emails/newUser";
import { reminderToBet } from "./emails/reminderToBet";
import { resetPassword } from "./emails/resetPassword";

export function SendEmailUtils(message: Buffer) {
  const messageJson = JSON.parse(message.toString());

  function checkEmailType() {
    if (messageJson.type === "newUser") {
      return newUser(messageJson);
    } if (messageJson.type === "resetPassword") {
      return resetPassword(messageJson);
    } if (messageJson.type === "newBet") {
      return newBet(messageJson);
    } if (messageJson.type === "newBetAdmin") {
      return newBetAdmin(messageJson);
    } if (messageJson.type === "reminderToBet") {
      return reminderToBet(messageJson);
    }

    return null;
  }

  const data = {
    from: "Prova Adonis V5 LabLuby <contact@teste.com>",
    to: `${messageJson.name} <${messageJson.email}>`,
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
