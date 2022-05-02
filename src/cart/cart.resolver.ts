import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CartEntity } from "./cart.entity";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/createCart.dto";
import { UpdateCartDto } from "./dto/updateCart.dto";

@Resolver()
export class CartResolver {
  constructor(private service: CartService) {}

  @Mutation(() => CartEntity)
  async createCart(@Args("data") data: CreateCartDto): Promise<CartEntity> {
    const cart = await this.service.createCart(data);
    return cart;
  }

  @Query(() => [CartEntity])
  async findCarts(): Promise<CartEntity[]> {
    const carts = await this.service.findCarts();
    return carts;
  }

  @Query(() => CartEntity)
  async findIdCart(@Args("id") id: string): Promise<CartEntity> {
    const cart = await this.service.findIdCart(id);
    return cart;
  }

  @Mutation(() => CartEntity)
  async updateCart(@Args("id") id: string, @Args("data") data: UpdateCartDto): Promise<CartEntity> {
    const cart = await this.service.updateCart(id, data);
    return cart;
  }

  @Mutation(() => CartEntity)
  async deleteCart(@Args("id") id: string): Promise<CartEntity> {
    const cart = await this.service.deleteCart(id);
    return cart;
  }
}
