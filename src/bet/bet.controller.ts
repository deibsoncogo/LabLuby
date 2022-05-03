import { Controller, Post, Get, Put, Delete, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { BetResolver } from "./bet.resolver";
import { CreateBetDto } from "./dto/createBet.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Controller("bet")
export class BetController {
  constructor(private resolver: BetResolver) {}

  @Post()
  async createBet(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { user_id, bets }: CreateBetDto = request.body;
    return response.status(201).json(await this.resolver.createBet({ user_id, bets }));
  }

  @Get()
  async findBets(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findBets());
  }

  @Get(":id")
  async findIdBet(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(200).json(await this.resolver.findIdBet(id));
  }

  @Put(":id")
  async updateBet(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    const { item, user_id, game_id }: UpdateBetDto = request.query;
    return response.status(201).json(await this.resolver.updateBet(id, { item, user_id, game_id }));
  }

  @Delete(":id")
  async deleteBet(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(205).json(await this.resolver.deleteBet(id));
  }
}
