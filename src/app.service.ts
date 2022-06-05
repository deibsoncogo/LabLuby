import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  app(): object {
    return { message: 'Hello world app' }
  }
}
