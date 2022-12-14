import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { CartService } from "src/cart/cart.service";
import { DatabaseService } from "src/database/database.service";
import { GameService } from "src/game/game.service";
import { UserService } from "src/user/user.service";
import { BetEntity } from "./bet.entity";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Injectable()
export class BetService {
  constructor(
    private database: DatabaseService,
    private userService: UserService,
    private gameService: GameService,
    private cartService: CartService,
  ) {}

  async createBet(data: CreateBetDto): Promise<BetEntity[]> {
    /** user */
    await this.userService.findIdUser(data.user_id);

    /** cart */
    let valueCartTotal = 0;
    for (const bet of data.bets) {
      const game = await this.gameService.findIdGame(bet.game_id);
      valueCartTotal += game.price;
    }

    const cart = await this.cartService.findCarts();

    if (valueCartTotal < cart[0].min_value) {
      throw new NotAcceptableException("Valor mínimo do carrinho não atingido");
    }

    /** game */
    const bets: BetEntity[] = [];
    for (const bet of data.bets) {
      const game = await this.gameService.findIdGame(bet.game_id);

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

    if (!bets) {
      throw new InternalServerErrorException("Erro inesperado ao criar as apostas");
    }

    return bets;
  }

  async findBets(): Promise<BetEntity[]> {
    const bets = await this.database.bets.findMany({ orderBy: { created_at: "desc" } });

    if (!bets) {
      throw new InternalServerErrorException("Erro inesperado ao listar as apostas");
    }

    return bets;
  }

  async findIdBet(id: string): Promise<BetEntity> {
    const bet = await this.database.bets.findUnique({
      where: { id },
      include: { user: true, game: true },
    });

    if (!bet) {
      throw new NotAcceptableException("Não foi encontrado nenhuma aposta com este ID");
    }

    delete bet.user.password;

    return bet;
  }

  async updateBet(id: string, data: UpdateBetDto): Promise<BetEntity> {
    await this.findIdBet(id);

    const bet = await this.database.bets.update({ where: { id }, data });

    if (!bet) {
      throw new InternalServerErrorException("Erro inesperado ao alterar a aposta");
    }

    return bet;
  }

  async deleteBet(id: string): Promise<BetEntity> {
    await this.findIdBet(id);

    const bet = await this.database.bets.delete({ where: { id } });

    if (!bet) {
      throw new InternalServerErrorException("Erro inesperado ao excluir a aposta");
    }

    return bet;
  }
}
