import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateGameDto } from "./dto/createGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";
import { GameEntity } from "./game.entity";
import { GameService } from "./game.service";

@Resolver()
export class GameResolver {
  constructor(private service: GameService) {}

  @Mutation(() => GameEntity)
  async createGame(@Args("data") data: CreateGameDto): Promise<GameEntity> {
    const game = await this.service.createGame(data);
    return game;
  }

  @Query(() => [GameEntity])
  async findGames(): Promise<GameEntity[]> {
    const games = await this.service.findGames();
    return games;
  }

  @Query(() => GameEntity)
  async findIdGame(@Args("id") id: string): Promise<GameEntity> {
    const game = await this.service.findIdGame(id);
    return game;
  }

  @Mutation(() => GameEntity)
  async updateGame(@Args("id") id: string, @Args("data") data: UpdateGameDto): Promise<GameEntity> {
    const game = await this.service.updateGame(id, data);
    return game;
  }

  @Mutation(() => GameEntity)
  async deleteGame(@Args("id") id: string): Promise<GameEntity> {
    const game = await this.service.deleteGame(id);
    return game;
  }
}
