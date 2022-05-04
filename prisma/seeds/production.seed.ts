import { PrismaClient } from "@prisma/client";
import { CreateGameDto } from "../../src/game/dto/createGame.dto";
import { CreateRuleDto } from "../../src/rule/dto/createRule.dto";
import { CreateUserDto } from "../../src/user/dto/createUser.dto";

type IFactories = {
  users: CreateUserDto[];
  rules: CreateRuleDto[];
  games: CreateGameDto[];
};

const Factories: IFactories = {
  users: [
    {
      name: "Usuário Terceiro",
      email: "devterceiro@outlook.com",
      password: "33ccCC",
    },
  ],
  rules: [
    {
      name: "player",
    },
    {
      name: "admin",
    },
  ],
  games: [
    {
      name: "Lotofácil",
      description:
        "Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!",
      range: 25,
      price: 2.5,
      max_number: 15,
      color: "#7F3992",
    },
    {
      name: "Mega-Sena",
      description:
        "Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.",
      range: 60,
      price: 4.5,
      max_number: 6,
      color: "#01AC66",
    },
    {
      name: "Quina",
      description:
        "Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.",
      range: 80,
      price: 2,
      max_number: 5,
      color: "#F79C31",
    },
  ],
};

const prisma = new PrismaClient();

export async function ProductionSeed() {
  try {
    //** vai atualizar ou adicionar o usuário dentro do Factories.users */
    for (const user of Factories.users) {
      await prisma.users.upsert({ where: { email: user.email }, update: user, create: user });
    }

    //** vai atualizar ou adicionar o regra dentro do Factories.rules */
    for (const rule of Factories.rules) {
      await prisma.rules.upsert({ where: { name: rule.name }, update: rule, create: rule });
    }

    //** vai atualizar ou adicionar o jogo dentro do Factories.games */
    for (const game of Factories.games) {
      await prisma.games.upsert({ where: { name: game.name }, update: game, create: game });
    }

    //** vai atualizar ou adicionar todos nível de acesso ao primeiro usuário */
    const user = await prisma.users.findFirst();
    const rules = await prisma.rules.findMany();

    for (const rule of rules) {
      await prisma.users_Rules.upsert({
        where: {
          user_id_rule_id: {
            user_id: user.id,
            rule_id: rule.id,
          },
        },
        update: { user_id: user.id, rule_id: rule.id },
        create: { user_id: user.id, rule_id: rule.id },
      });
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
}

ProductionSeed();
