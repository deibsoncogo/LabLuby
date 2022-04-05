import mailgun from "mailgun-js";
import { newBet } from "./emails/newBet";
import { newUser } from "./emails/newUser";
import { reminderToBet } from "./emails/reminderToBet";
import { resetPassword } from "./emails/resetPassword";

export function SendEmailUtils(message: Buffer) {
  const messageJson = JSON.parse(message.toString());

  const data = {
    from: "Prova Adonis V5 LabLuby <contact@teste.com>",
    to: `${messageJson.name} <${messageJson.email}>`,
    subject: messageJson.subject,
    html: newUser(messageJson),
  };

  mailgun({
    apiKey: "a93249d9900ec333256ed2086c26463f-0677517f-da8c0a2b",
    domain: "sandboxb1cae3899351431da3d46fda396ec618.mailgun.org",
  }).messages().send(data, (error) => {
    console.log(error || `E-mail enviado, ${messageJson.email}`);
  });
}
