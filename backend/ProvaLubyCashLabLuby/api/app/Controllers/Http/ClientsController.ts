import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import axios from 'axios'

export default class ClientsController {
  public async index ({ request, response }: HttpContextContract) {
    const {
      fullName, email, cpf, phone, address, city, state, zipCode,
      averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
    } = request.all()

    const responseAxios = await axios.get(`${process.env.BASE_URL_MS}/client`, { params: {
      fullName, email, cpf, phone, address, city, state, zipCode,
      averageSalary, currentBalance, status, createdAtFrom, createdAtTo,
    }})
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(responseAxios[0]).json(responseAxios[1])
  }

  public async store ({ request, response }: HttpContextContract) {
    const { userId, cpf, phone, address, city, state, zipCode, averageSalary } = request.all()

    const user = await User.findOrFail(userId)

    const responseAxios = await axios.post(`${process.env.BASE_URL_MS}/client`, {
      userId, fullName: user.fullName, email: user.email, cpf,
      phone, address, city, state, zipCode, averageSalary,
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

  public async show ({ params, response }: HttpContextContract) {
    const responseAxios = await axios.get(`${process.env.BASE_URL_MS}/client/${params.id}`)
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(responseAxios[0]).json(responseAxios[1])
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const { cpf, phone, address, city, state, zipCode, averageSalary } = request.all()

    const user = await User.findByOrFail('clientId', params.id)

    const responseAxios = await axios.put(`${process.env.BASE_URL_MS}/client/${params.id}`, null, {
      params: {
        fullName: user.fullName, email: user.email, cpf, phone,
        address, city, state, zipCode, averageSalary,
      },
    })
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(responseAxios[0]).json(responseAxios[1])
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const responseAxios = await axios.delete(`${process.env.BASE_URL_MS}/client/${params.id}`)
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(responseAxios[0]).json(responseAxios[1])
  }
}
