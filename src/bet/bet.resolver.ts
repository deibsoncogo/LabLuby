import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BetEntity } from "./bet.entity";
import { BetService } from "./bet.service";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Resolver()
export class BetResolver {
  constructor(private service: BetService) {}

  @Mutation(() => [BetEntity])
  async createBet(@Args("data") data: CreateBetDto): Promise<BetEntity[]> {
    const bets = await this.service.createBet(data);
    return bets;
  }

  @Query(() => [BetEntity])
  async findBets(): Promise<BetEntity[]> {
    const bets = await this.service.findBets();
    return bets;
  }

  @Query(() => BetEntity)
  async findIdBet(@Args("id") id: string): Promise<BetEntity> {
    const bet = await this.service.findIdBet(id);
    return bet;
  }

  @Mutation(() => BetEntity)
  async updateBet(@Args("id") id: string, @Args("data") data: UpdateBetDto): Promise<BetEntity> {
    const bet = await this.service.updateBet(id, data);
    return bet;
  }

  @Mutation(() => BetEntity)
  async deleteBet(@Args("id") id: string): Promise<BetEntity> {
    const bet = await this.service.deleteBet(id);
    return bet;
  }
}
