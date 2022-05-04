import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateGameDto } from "./dto/createGame.dto";
import { IdGameDto } from "./dto/idGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";
import { GameResolver } from "./game.resolver";

@Controller("game")
export class GameController {
  constructor(private resolver: GameResolver) {}

  @Post()
  async createGame(@Body() body: CreateGameDto, @Res() response: Response): Promise<Response> {
    const { name, description, range, price, max_number, color } = body;
    return response
      .status(201)
      .json(await this.resolver.createGame({ name, description, range, price, max_number, color }));
  }

  @Get()
  async findGames(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findGames());
  }

  @Get(":id")
  async findIdGame(@Param() param: IdGameDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(200).json(await this.resolver.findIdGame(id));
  }

  @Put(":id")
  async updateGame(
    @Param() param: IdGameDto,
    @Query() query: UpdateGameDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param;
    const { name, description, range, price, max_number, color } = query;

    return response.status(201).json(
      await this.resolver.updateGame(id, {
        name,
        description,
        range: range && Number(range),
        price: price && Number(price),
        max_number: max_number && Number(max_number),
        color,
      }),
    );
  }

  @Delete(":id")
  async deleteGame(@Param() param: IdGameDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(205).json(await this.resolver.deleteGame(id));
  }
}
