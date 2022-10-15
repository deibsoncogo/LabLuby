import { Query, Resolver } from '@nestjs/graphql'
import { AppEntity } from './app.entity'
import { AppService } from './app.service'

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => AppEntity)
  app(): object {
    return this.appService.app()
  }
}
