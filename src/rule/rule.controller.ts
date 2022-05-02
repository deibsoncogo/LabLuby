import { Controller, Delete, Get, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateRuleDto } from "./dto/createRule.dto";
import { UpdateRuleDto } from "./dto/updateRule.dto";
import { RuleResolver } from "./rule.resolver";

@Controller("rule")
export class RuleController {
  constructor(private resolver: RuleResolver) {}

  @Post("")
  async createRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { name }: CreateRuleDto = request.body;

    return response.status(201).json(await this.resolver.createRule({ name }));
  }

  @Get("")
  async findRules(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findRules());
  }

  @Get(":id")
  async findIdRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;

    return response.status(200).json(await this.resolver.findIdRule(id));
  }

  @Put(":id")
  async updateRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    const { name }: UpdateRuleDto = request.query;

    return response.status(201).json(await this.resolver.updateRule(id, { name }));
  }

  @Delete(":id")
  async deleteRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;

    return response.status(205).json(await this.resolver.deleteRule(id));
  }
}
