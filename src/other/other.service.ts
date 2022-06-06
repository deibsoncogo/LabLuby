import { Injectable } from '@nestjs/common'

@Injectable()
export class OtherService {
  other(data: any): any {
    return data
  }
}
