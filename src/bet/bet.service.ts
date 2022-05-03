import { Injectable, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { BetEntity } from "./bet.entity";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Injectable()
export class BetService {
  constructor(private database: DatabaseService) {}

  async createBet(data: CreateBetDto): Promise<BetEntity[]> {
    // user
    const user = await this.database.users.findUnique({ where: { id: data.user_id } });

    if (!user) {
      throw new NotAcceptableException("Não foi encontrado nenhum usuário com este ID");
    }

    // cart
    let valueCartTotal = 0;
    for (const bet of data.bets) {
      const game = await this.database.games.findUnique({ where: { id: bet.game_id } });

      if (!game) {
        throw new NotAcceptableException("Não foi encontrado nenhum jogo com este ID");
      }

      valueCartTotal += game.price;
    }

    const cart = await this.database.carts.findFirst({ orderBy: { created_at: "desc" } });

    if (!cart) {
      throw new NotAcceptableException("Não foi encontrado nenhum carrinho cadastrado");
    }

    if (valueCartTotal < cart.min_value) {
      throw new NotAcceptableException("Valor mínimo do carrinho não atingido");
    }

    // game
    const bets: BetEntity[] = [];
    for (const bet of data.bets) {
      const game = await this.database.games.findUnique({ where: { id: bet.game_id } });

      if (!game) {
        throw new NotAcceptableException("Não foi encontrado nenhum jogo com este ID");
      }

      const items = bet.items.split(",");

      if (items.length !== game.max_number) {
        throw new NotAcceptableException("Quantidade de números/itens inválida");
      }

      for (const item of items) {
        if (!(Number(item) > 0)) {
          throw new NotAcceptableException("Foi informado um tipo de valor inválido");
        }
      }

      const betCreate = await this.database.bets.create({
        data: {
          item: bet.items,
          user_id: data.user_id,
          game_id: bet.game_id,
        },
      });

      bets.push(betCreate);
    }

    return bets;
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
