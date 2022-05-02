import { Query, Resolver } from "@nestjs/graphql";
import { AppEntity } from "./app.entity";
import { AppService } from "./app.service";

@Resolver()
export class AppResolver {
  constructor(private service: AppService) {}

  @Query(() => [AppEntity])
  async findApps(): Promise<AppEntity[]> {
    const apps = await this.service.findApps();
    return apps;
  }
}
