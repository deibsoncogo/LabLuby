import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AccessLevel, AccessLevels } from "./accessLevel.decorator";
import { AuthEntity } from "./auth.entity";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/createAuth.dto";

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @AccessLevel(AccessLevels.Public)
  @Mutation(() => AuthEntity)
  async createAuth(@Args("data") data: CreateAuthDto): Promise<AuthEntity> {
    const auth = await this.service.createAuth(data);
    return auth;
  }
}
