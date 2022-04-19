import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class RevalidateStatusClient {
  public async update ({ response }: HttpContextContract) {
    const responseAxios = await axios
      .patch(`${process.env.BASE_URL_MS}/client/validateStatusAllClient`)
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(responseAxios[0]).json(responseAxios[1])
  }
}
