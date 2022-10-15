import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccessLevel, AccessLevels } from "src/auth/accessLevel.decorator";
import { CartEntity } from "./cart.entity";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/createCart.dto";
import { UpdateCartDto } from "./dto/updateCart.dto";

@Resolver()
export class CartResolver {
  constructor(private service: CartService) {}

  @AccessLevel(AccessLevels.Player)
  @Mutation(() => CartEntity)
  async createCart(@Args("data") data: CreateCartDto): Promise<CartEntity> {
    const cart = await this.service.createCart(data);
    return cart;
  }

  @AccessLevel(AccessLevels.Admin)
  @Query(() => [CartEntity])
  async findCarts(): Promise<CartEntity[]> {
    const carts = await this.service.findCarts();
    return carts;
  }

  @AccessLevel(AccessLevels.Player)
  @Query(() => CartEntity)
  async findIdCart(@Args("id") id: string): Promise<CartEntity> {
    const cart = await this.service.findIdCart(id);
    return cart;
  }

  @AccessLevel(AccessLevels.Player)
  @Mutation(() => CartEntity)
  async updateCart(@Args("id") id: string, @Args("data") data: UpdateCartDto): Promise<CartEntity> {
    const cart = await this.service.updateCart(id, data);
    return cart;
  }

  @AccessLevel(AccessLevels.Admin)
  @Mutation(() => CartEntity)
  async deleteCart(@Args("id") id: string): Promise<CartEntity> {
    const cart = await this.service.deleteCart(id);
    return cart;
  }
}
