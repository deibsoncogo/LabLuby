import { Query, Resolver } from "@nestjs/graphql";
import { AppEntity } from "./app.entity";
import { AppService } from "./app.service";
import { AccessLevel, AccessLevels } from "./auth/accessLevel.decorator";

@Resolver()
export class AppResolver {
  constructor(private service: AppService) {}

  @AccessLevel(AccessLevels.Public)
  @Query(() => [AppEntity])
  async findApps(): Promise<AppEntity[]> {
    const apps = await this.service.findApps();
    return apps;
  }
}
