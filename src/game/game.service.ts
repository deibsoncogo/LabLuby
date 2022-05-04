import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateGameDto } from "./dto/createGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";
import { GameEntity } from "./game.entity";

@Injectable()
export class GameService {
  constructor(private database: DatabaseService) {}

  async createGame(data: CreateGameDto): Promise<GameEntity> {
    await this.hasNameAlreadyExistsGame(data.name);

    const game = await this.database.games.create({ data });

    if (!game) {
      throw new InternalServerErrorException("Erro inesperado ao criar o jogo");
    }

    return game;
  }

  async findGames(): Promise<GameEntity[]> {
    const games = await this.database.games.findMany({ orderBy: { created_at: "asc" } });

    if (!games) {
      throw new InternalServerErrorException("Erro inesperado ao listar os jogos");
    }

    return games;
  }

  async findIdGame(id: string): Promise<GameEntity> {
    const game = await this.database.games.findUnique({
      where: { id },
      include: { Bets: { include: { user: true } } },
    });

    if (!game) {
      throw new NotAcceptableException("Não foi encontrado nenhum jogo com este ID");
    }

    return game;
  }

  async updateGame(id: string, data: UpdateGameDto): Promise<GameEntity> {
    await this.findIdGame(id);
    data.name && (await this.hasNameAlreadyExistsGame(data.name));

    const game = await this.database.games.update({ where: { id }, data });

    if (!game) {
      throw new InternalServerErrorException("Erro inesperado ao atualizar o jogo");
    }

    return game;
  }

  async deleteGame(id: string): Promise<GameEntity> {
    await this.findIdGame(id);

    const game = await this.database.games.delete({ where: { id } });

    if (!game) {
      throw new InternalServerErrorException("Erro inesperado ao excluir o jogo");
    }

    return game;
  }

  async hasNameAlreadyExistsGame(name: string): Promise<boolean> {
    const game = await this.database.games.findUnique({ where: { name } });

    if (game) {
      throw new NotAcceptableException("Já existe um jogo com este nome registrado");
    }

    return false;
  }
}
