import mailgun from "mailgun-js";
import { ClientStatus } from "../templates/email/clientStatus";
import { ResetPassword } from "../templates/email/resetPassword";

interface IMessage {
  type: string,
  fullName: string,
  email: string,
  status?: string
  url?: string
}

export function SendEmailUtils(message: IMessage) {
  function checkEmailType() {
    if (message.type === "ClientStatus") {
      return ["Status da conta", ClientStatus({ fullName: message.fullName, status: message.status })];
    }

    if (message.type === "ResetPassword") {
      return ["Nova senha", ResetPassword({ fullName: message.fullName, url: message.url })];
    }

    return null;
  }

  const data = {
    from: "Luby Cash <contato@lubycash.com>",
    to: `${message.fullName} <${message.email}>`,
    subject: checkEmailType()[0],
    html: checkEmailType()[1],
  };

  mailgun({
    apiKey: "a93249d9900ec333256ed2086c26463f-0677517f-da8c0a2b",
    domain: "sandboxb1cae3899351431da3d46fda396ec618.mailgun.org",
  }).messages().send(data, (error) => {
    console.log(error || `E-mail enviado, ${checkEmailType()[0]} - ${message.email}`);
  });
}
