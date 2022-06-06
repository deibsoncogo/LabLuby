import { Response } from 'express'
import { Controller, Get, Headers, Query, Res } from '@nestjs/common'
import { OtherService } from './other.service'

@Controller('other')
export class OtherController {
  constructor(private readonly otherService: OtherService) {}

  @Get()
  other(@Query() query: any, @Headers() headers: any, @Res() response: Response): Response {
    return response.status(200).json(this.otherService.other({ query, headers }))
  }
}
