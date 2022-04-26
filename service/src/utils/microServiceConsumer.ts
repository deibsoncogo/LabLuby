import { request, response } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";
import { SendEmailUtils } from "./sendEmailUtils";

export function MicroServiceConsumer(message: Buffer) {
  const messageJson = JSON.parse(message.toString());

  if (messageJson.type === "createClient") {
    request.body = messageJson.data;

    new CreateOneClientController().handle(request, response);
  }

  if (messageJson.type === "resetPassword") {
    const { name, email, url } = messageJson.data;

    SendEmailUtils({ type: "ResetPassword", fullName: name, email, url });
  }
}
