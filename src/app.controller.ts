import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async findApp(@Res() response: Response): Promise<Response> {
    return response.status(200).json(this.appService.getApp());
  }
}
