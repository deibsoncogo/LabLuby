import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CartResolver } from "./cart.resolver";
import { CreateCartDto } from "./dto/createCart.dto";
import { IdCartDto } from "./dto/idCart.dto";
import { UpdateCartDto } from "./dto/updateCart.dto";

@Controller("cart")
export class CartController {
  constructor(private resolver: CartResolver) {}

  @Post()
  async createCart(@Body() body: CreateCartDto, @Res() response: Response): Promise<Response> {
    const { min_value } = body;
    return response.status(201).json(await this.resolver.createCart({ min_value }));
  }

  @Get()
  async findCarts(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findCarts());
  }

  @Get(":id")
  async findIdCart(@Param() param: IdCartDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(200).json(await this.resolver.findIdCart(id));
  }

  @Put(":id")
  async updateCart(
    @Param() param: IdCartDto,
    @Query() query: UpdateCartDto,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = param;
    const { min_value } = query;

    return response.status(201).json(
      await this.resolver.updateCart(id, {
        min_value: min_value && Number(min_value),
      }),
    );
  }

  @Delete(":id")
  async deleteCart(@Param() param: IdCartDto, @Res() response: Response): Promise<Response> {
    const { id } = param;
    return response.status(205).json(await this.resolver.deleteCart(id));
  }
}
