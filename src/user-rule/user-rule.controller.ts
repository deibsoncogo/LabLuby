import { Controller, Delete, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateUserRuleDto } from "./dto/createUserRule.dto";
import { DeleteUserRuleDto } from "./dto/deleteUserRule.dto";
import { UserRuleResolver } from "./user-rule.resolver";

@Controller("userRule")
export class UserRuleController {
  constructor(private resolver: UserRuleResolver) {}

  @Post()
  async createUserRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { user_id, rule_id }: CreateUserRuleDto = request.body;
    return response.status(201).json(await this.resolver.createUserRule({ user_id, rule_id }));
  }

  @Get()
  async findUsersRules(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findUsersRules());
  }

  @Delete()
  async deleteUserRule(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { user_id, rule_id }: DeleteUserRuleDto = request.body;
    return response.status(205).json(await this.resolver.deleteUserRule({ user_id, rule_id }));
  }
}
