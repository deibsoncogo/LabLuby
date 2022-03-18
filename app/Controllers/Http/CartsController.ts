import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import { CartStoreValidator } from 'App/Validators/Cart/CartStoreValidator'
import { CartIdValidator } from 'App/Validators/Cart/CartIdValidator'
import { CartUpdateValidator } from 'App/Validators/Cart/CartUpdateValidator'

export default class CartsController {
  public async index({ response }: HttpContextContract) {
    const carts = await Cart.all()
    return response.status(200).json(carts)
  }

  public async store({ request, response }: HttpContextContract) {
    await request.validate(CartStoreValidator)
    const data = request.only(['minValue'])
    const cart = await Cart.create(data)
    return response.status(201).json(cart)
  }

  public async show({ params, request, response }: HttpContextContract) {
    await request.validate(CartIdValidator)
    const cart = await Cart.findOrFail(params.id)
    return response.status(200).json(cart)
  }

  public async update({ params, request, response }: HttpContextContract) {
    await request.validate(CartUpdateValidator)
    const data = request.only(['minValue'])
    const cart = await Cart.findOrFail(params.id)
    await cart.merge(data).save()
    return response.status(201).json(cart)
  }

  public async destroy({ params, request, response }: HttpContextContract) {
    await request.validate(CartIdValidator)
    const cart = await Cart.findOrFail(params.id)
    await cart.delete()
    return response.status(204)
  }
}
