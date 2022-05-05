import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CreateRuleDto } from "./dto/createRule.dto";
import { UpdateRuleDto } from "./dto/updateRule.dto";
import { RuleEntity } from "./rule.entity";

@Injectable()
export class RuleService {
  constructor(private database: DatabaseService) {}

  async createRule(data: CreateRuleDto): Promise<RuleEntity> {
    await this.hasNameAlreadyExists(data.name);

    const rule = await this.database.rules.create({ data });

    if (!rule) {
      throw new InternalServerErrorException("Erro inesperado ao criar a regra");
    }

    return rule;
  }

  async findRules(): Promise<RuleEntity[]> {
    const rules = await this.database.rules.findMany({ orderBy: { created_at: "asc" } });

    if (!rules) {
      throw new InternalServerErrorException("Erro inesperado ao buscar todas regras");
    }

    return rules;
  }

  async findIdRule(id: string): Promise<RuleEntity> {
    const rule = await this.database.rules.findUnique({
      where: { id },
      include: { Users_Rules: { include: { user: true } } },
    });

    if (!rule) {
      throw new NotAcceptableException("Não foi encontrado nenhuma regra com este ID");
    }

    rule.Users_Rules.forEach((rule) => {
      delete rule.user.password;
    });

    return rule;
  }

  async updateRule(id: string, data: UpdateRuleDto): Promise<RuleEntity> {
    await this.findIdRule(id);

    const rule = await this.database.rules.update({ where: { id }, data });

    if (!rule) {
      throw new InternalServerErrorException("Erro inesperado ao atualizar a regra");
    }

    return rule;
  }

  async deleteRule(id: string): Promise<RuleEntity> {
    await this.findIdRule(id);

    const rule = await this.database.rules.delete({ where: { id } });

    if (!rule) {
      throw new InternalServerErrorException("Erro inesperado ao excluir a regra");
    }

    return rule;
  }

  async hasNameAlreadyExists(name: string): Promise<boolean> {
    const rule = await this.database.rules.findUnique({ where: { name } });

    if (rule) {
      throw new NotAcceptableException("Já existe uma regra com este nome registrado");
    }

    return false;
  }
}
