import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MicroServiceProducerUtils } from 'App/Utils/MicroServiceProducer'

export default class ClientsController {
  public async store ({ request, response }: HttpContextContract) {
    const data = request.only(
      ['userId', 'cpf', 'phone', 'address', 'city', 'state', 'zipCode', 'averageSalary']
    )

    MicroServiceProducerUtils({ type: 'createClient', data })

    return response.status(202).json(
      { message: 'O cadastro está sendo avaliado, será enviado um e-mail assim que for finalizado'}
    )
  }
}
