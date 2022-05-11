import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccessLevel, AccessLevels } from "src/auth/accessLevel.decorator";
import { BetEntity } from "./bet.entity";
import { BetService } from "./bet.service";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Resolver()
export class BetResolver {
  constructor(private service: BetService) {}

  @AccessLevel(AccessLevels.Player)
  @Mutation(() => [BetEntity])
  async createBet(@Args("data") data: CreateBetDto): Promise<BetEntity[]> {
    const bets = await this.service.createBet(data);
    return bets;
  }

  @AccessLevel(AccessLevels.Admin)
  @Query(() => [BetEntity])
  async findBets(): Promise<BetEntity[]> {
    const bets = await this.service.findBets();
    return bets;
  }

  @AccessLevel(AccessLevels.Player)
  @Query(() => BetEntity)
  async findIdBet(@Args("id") id: string): Promise<BetEntity> {
    const bet = await this.service.findIdBet(id);
    return bet;
  }

  @AccessLevel(AccessLevels.Player)
  @Mutation(() => BetEntity)
  async updateBet(@Args("id") id: string, @Args("data") data: UpdateBetDto): Promise<BetEntity> {
    const bet = await this.service.updateBet(id, data);
    return bet;
  }

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => BetEntity)
  async deleteBet(@Args("id") id: string): Promise<BetEntity> {
    const bet = await this.service.deleteBet(id);
    return bet;
  }
}
