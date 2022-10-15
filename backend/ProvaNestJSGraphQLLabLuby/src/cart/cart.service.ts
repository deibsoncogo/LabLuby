import { Injectable, InternalServerErrorException, NotAcceptableException } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CartEntity } from "./cart.entity";
import { CreateCartDto } from "./dto/createCart.dto";
import { UpdateCartDto } from "./dto/updateCart.dto";

@Injectable()
export class CartService {
  constructor(private database: DatabaseService) {}

  async createCart(data: CreateCartDto): Promise<CartEntity> {
    const cart = await this.database.carts.create({ data });

    if (!cart) {
      throw new InternalServerErrorException("Erro inesperado ao criar o carrinho");
    }

    return cart;
  }

  async findCarts(): Promise<CartEntity[]> {
    const carts = await this.database.carts.findMany({ orderBy: { created_at: "desc" } });

    if (!carts) {
      throw new InternalServerErrorException("Erro inesperado ao listar os carrinhos");
    }

    return carts;
  }

  async findIdCart(id: string): Promise<CartEntity> {
    const cart = await this.database.carts.findUnique({ where: { id } });

    if (!cart) {
      throw new NotAcceptableException("Não foi encontrado nenhum jogo com este ID");
    }

    return cart;
  }

  async updateCart(id: string, data: UpdateCartDto): Promise<CartEntity> {
    await this.findIdCart(id);

    const cart = await this.database.carts.update({ where: { id }, data });

    if (!cart) {
      throw new InternalServerErrorException("Erro inesperado ao alterar o carrinho");
    }

    return cart;
  }

  async deleteCart(id: string): Promise<CartEntity> {
    await this.findIdCart(id);

    const cart = await this.database.carts.delete({ where: { id } });

    if (!cart) {
      throw new InternalServerErrorException("Erro inesperado ao excluir o carrinho");
    }

    return cart;
  }
}
