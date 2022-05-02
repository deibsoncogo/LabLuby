import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { BetEntity } from "./bet.entity";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Injectable()
export class BetService {
  constructor(private database: DatabaseService) {}

  async createBet(data: CreateBetDto): Promise<BetEntity> {
    const bet = await this.database.bets.create({ data });
    return bet;
  }

  async findBets(): Promise<BetEntity[]> {
    const bet = await this.database.bets.findMany();
    return bet;
  }

  async findIdBet(id: string): Promise<BetEntity> {
    const bet = await this.database.bets.findUnique({ where: { id } });
    return bet;
  }

  async updateBet(id: string, data: UpdateBetDto): Promise<BetEntity> {
    const bet = await this.database.bets.update({ where: { id }, data });
    return bet;
  }

  async deleteBet(id: string): Promise<BetEntity> {
    const bet = await this.database.bets.delete({ where: { id } });
    return bet;
  }
}
