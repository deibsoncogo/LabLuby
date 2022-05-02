import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { AppResolver } from "./app.resolver";

@Controller()
export class AppController {
  constructor(private resolver: AppResolver) {}

  @Get()
  async findApps(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findApps());
  }
}
