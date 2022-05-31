import { Request, Response } from "express"
import { Controller, Get, Req, Res } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller("app")
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  async findApps(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const token = request.headers.authorization
    return response.status(200).json(await this.appService.findApps(token))
  }
}
