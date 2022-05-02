import { Controller, Post, Get, Put, Delete, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { CartResolver } from "./cart.resolver";
import { CreateCartDto } from "./dto/createCart.dto";
import { UpdateCartDto } from "./dto/updateCart.dto";

@Controller("cart")
export class CartController {
  constructor(private resolver: CartResolver) {}

  @Post()
  async createCart(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { min_value }: CreateCartDto = request.body;
    return response.status(201).json(await this.resolver.createCart({ min_value }));
  }

  @Get()
  async findCarts(@Res() response: Response): Promise<Response> {
    return response.status(200).json(await this.resolver.findCarts());
  }

  @Get(":id")
  async findIdCart(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(200).json(await this.resolver.findIdCart(id));
  }

  @Put(":id")
  async updateCart(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    const { min_value }: UpdateCartDto = request.query;
    return response.status(201).json(
      await this.resolver.updateCart(id, {
        min_value: min_value && Number(min_value),
      }),
    );
  }

  @Delete(":id")
  async deleteCart(@Req() request: Request, @Res() response: Response): Promise<Response> {
    const { id } = request.params;
    return response.status(205).json(await this.resolver.deleteCart(id));
  }
}
