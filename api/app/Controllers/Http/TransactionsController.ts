import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import axios from 'axios'

export default class TransactionsController {
  public async store ({ request, response }: HttpContextContract) {
    const data = request.only(['type', 'amount', 'clientCpfFrom', 'clientCpfTo'])

    let isFrom = false; let isTo = false
    if (data.type === 'pix' || data.type === 'transferência') {
      isFrom = true
      isTo = true
    } else if (data.type === 'saque') {
      isFrom = true
      data.clientCpfTo = null
    } else if (data.type === 'deposito') {
      data.clientCpfFrom = null
      isTo = true
    } else {
      return response.status(409).json({ error: 'Tipo da movimentação inválido'}
      )
    }

    const cpfAll = [data.clientCpfFrom , data.clientCpfTo]

    for (const cpf of cpfAll) {
      if (cpf === null) {
        continue
      }

      const client = await axios
        .get(`${process.env.BASE_URL_MS}/client/findOneCpf/${cpf}`)
        .then((response) => {
          return [response.status, response.data]
        }).catch((error) => {
          return [error.response.status, error.response.data]
        })

      if (client[1].status !== 'approved') {
        return response.status(409).json(
          { error: 'Este cliente não possui autorização para executar transações'}
        )
      }

      if (!isTo) {
        if (client[1].currentBalance < data.amount) {
          return response.status(409).json({ error: 'O cliente não possui saldo suficiente'})
        }
      }
    }

    for (const cpf of cpfAll) {
      if (cpf === null) {
        continue
      }

      let amount = 0
      if (isFrom) {
        amount = data.amount * -1
        isFrom = !isFrom
      } else {
        amount = data.amount
      }

      await axios
        .patch(`${process.env.BASE_URL_MS}/client/updateCurrentBalance`, { cpf, amount })
        .then((response) => {
          return [response.status, response.data]
        }).catch((error) => {
          return [error.response.status, error.response.data]
        })
    }

    const transaction = await Transaction.create(data)

    return response.status(201).json(transaction)
  }
}
