import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateRuleDto } from "./dto/createRule.dto";
import { IdRuleDto } from "./dto/idRule.dto";
import { UpdateRuleDto } from "./dto/updateRule.dto";
import { RuleResolver } from "./rule.resolver";

@Controller("rule")
export class RuleController {
  constructor(private resolver: RuleResolver) {}

  @Post()
  async createRule(@Body() body: CreateRuleDto, @Res() response: Response): Promise<Response> {
    const { name } = body;
    return response.status(201).json(await this.resolver.createRule({ name }));
  }

  @Get()
  async findRules(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findRules());
  }

  @Get(":id")
  async findIdRule(@Param() param: IdRuleDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(200).json(await this.resolver.findIdRule(id));
  }

  @Put(":id")
  async updateRule(
    @Param() param: IdRuleDto,
    @Query() query: UpdateRuleDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param;
    const { name } = query;

    return response.status(201).json(await this.resolver.updateRule(id, { name }));
  }

  @Delete(":id")
  async deleteRule(@Param() param: IdRuleDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(205).json(await this.resolver.deleteRule(id));
  }
}
