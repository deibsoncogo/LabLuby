import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return ['Retornaria todos usuário']
  }

  public async store({}: HttpContextContract) {
    return ['Criaria um usuário']
  }

  public async show({}: HttpContextContract) {
    return ['Buscaria um usuário']
  }

  public async update({}: HttpContextContract) {
    return ['Editaria um usuário']
  }

  public async destroy({}: HttpContextContract) {
    return ['Excluiria um usuário']
  }
}
