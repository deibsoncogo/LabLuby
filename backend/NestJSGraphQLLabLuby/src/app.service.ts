import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getApp(): object {
    return { message: "Hello World" };
  }
}
