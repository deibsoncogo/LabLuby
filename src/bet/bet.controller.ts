import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { BetResolver } from "./bet.resolver";
import { CreateBetDto } from "./dto/createBet.dto";
import { IdBetDto } from "./dto/idUser.dto";
import { UpdateBetDto } from "./dto/updateBet.dto";

@Controller("bet")
export class BetController {
  constructor(private resolver: BetResolver) {}

  @Post()
  async createBet(@Body() body: CreateBetDto, @Res() response: Response): Promise<Response> {
    const { user_id, bets } = body;
    return response.status(201).json(await this.resolver.createBet({ user_id, bets }));
  }

  @Get()
  async findBets(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findBets());
  }

  @Get(":id")
  async findIdBet(@Param() param: IdBetDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(200).json(await this.resolver.findIdBet(id));
  }

  @Put(":id")
  async updateBet(
    @Param() param: IdBetDto,
    @Query() query: UpdateBetDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param;
    const { item, user_id, game_id } = query;

    return response.status(201).json(await this.resolver.updateBet(id, { item, user_id, game_id }));
  }

  @Delete(":id")
  async deleteBet(@Param() param: IdBetDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(205).json(await this.resolver.deleteBet(id));
  }
}
