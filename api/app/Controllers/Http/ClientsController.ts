import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import axios from 'axios'

export default class ClientsController {
  public async store ({ request, response }: HttpContextContract) {
    const data = request.only(
      ['userId', 'cpf', 'phone', 'address', 'city', 'state', 'zipCode', 'averageSalary']
    )

    const user = await User.findOrFail(data.userId)

    const responseAxios = await axios.post(`${process.env.BASE_URL_MS}/client`, {
      userId: data.userId,
      cpf: data.cpf,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      averageSalary: data.averageSalary,
      fullName: user.fullName,
      email: user.email,
    })
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    user.clientId = responseAxios[1].id
    await user.save()

    return response.status(responseAxios[0]).json(responseAxios[1])
  }
}
