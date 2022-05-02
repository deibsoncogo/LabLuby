import { Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateGameDto } from "./dto/createGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";
import { GameResolver } from "./game.resolver";

@Controller("game")
export class GameController {
  constructor(private resolver: GameResolver) {}

  @Post()
  async createGame(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { name, description, range, price, max_number, color }: CreateGameDto = request.body;
    return response.status(201).json(await this.resolver.createGame({ name, description, range, price, max_number, color }));
  }

  @Get()
  async findGames(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findGames());
  }

  @Get(":id")
  async findIdGame(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(200).json(await this.resolver.findIdGame(id));
  }

  @Put(":id")
  async updateGame(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, range, price, max_number, color }: UpdateGameDto = request.query;
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
  async deleteGame(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(205).json(await this.resolver.deleteGame(id));
  }
}
