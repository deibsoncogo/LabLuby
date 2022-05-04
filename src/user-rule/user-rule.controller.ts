import { Body, Controller, Delete, Get, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CreateUserRuleDto } from "./dto/createUserRule.dto";
import { DeleteUserRuleDto } from "./dto/deleteUserRule.dto";
import { UserRuleResolver } from "./user-rule.resolver";

@Controller("userRule")
export class UserRuleController {
  constructor(private resolver: UserRuleResolver) {}

  @Post()
  async createUserRule(@Body() body: CreateUserRuleDto, @Res() response: Response): Promise<Response> {
    const { user_id, rule_id } = body;
    return response.status(201).json(await this.resolver.createUserRule({ user_id, rule_id }));
  }

  @Get()
  async findUsersRules(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findUsersRules());
  }

  @Delete()
  async deleteUserRule(@Body() body: DeleteUserRuleDto, @Res() response: Response): Promise<Response> {
    const { user_id, rule_id } = body;
    return response.status(205).json(await this.resolver.deleteUserRule({ user_id, rule_id }));
  }
}
