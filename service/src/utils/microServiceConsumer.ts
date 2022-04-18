import { request, response } from "express";
import { CreateOneClientController } from "../modules/clients/useCases/createOneClient/createOneClientController";

export function MicroServiceConsumer(message: Buffer) {
  const messageJson = JSON.parse(message.toString());

  if (messageJson.type === "createClient") {
    request.body = messageJson.data;

    new CreateOneClientController().handle(request, response);
  }
}
