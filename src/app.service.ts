import { Injectable } from "@nestjs/common";
import { AppEntity } from "./app.entity";

@Injectable()
export class AppService {
  async findApps(): Promise<AppEntity[]> {
    return [{ message: "Hello world" }];
  }
}
