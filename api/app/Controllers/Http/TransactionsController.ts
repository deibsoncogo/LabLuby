import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import axios from 'axios'

export default class TransactionsController {
  public async store ({ request, response }: HttpContextContract) {
    let { type, amount, clientCpfFrom, clientCpfTo } = request.all()

    let isFrom = false; let isTo = false
    if (type === 'pix' || type === 'transferência') {
      isFrom = true
      isTo = true
    } else if (type === 'saque') {
      isFrom = true
      clientCpfTo = null
    } else if (type === 'deposito') {
      clientCpfFrom = null
      isTo = true
    } else {
      return response.status(409).json({ error: 'Tipo da movimentação inválido'}
      )
    }

    const cpfAll = [clientCpfFrom , clientCpfTo]
    const idAll: string[] = []

    for (const index in cpfAll) {
      if (cpfAll[index] === null) {
        continue
      }

      const client = await axios
        .get(`${process.env.BASE_URL_MS}/client/findOneCpf/${cpfAll[index]}`)
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

      if (isFrom) {
        if (client[1].currentBalance < amount) {
          return response.status(409).json({ error: 'O cliente não possui saldo suficiente'})
        }
      }

      idAll[index] = client[1].id
    }

    for (const cpf of cpfAll) {
      if (cpf === null) {
        continue
      }

      let amountSub = 0
      if (isFrom) {
        amountSub = amount * -1
        isFrom = !isFrom
      } else {
        amountSub = amount
      }

      await axios
        .patch(`${process.env.BASE_URL_MS}/client/updateCurrentBalance`, { cpf, amount: amountSub })
        .then((response) => {
          return [response.status, response.data]
        }).catch((error) => {
          return [error.response.status, error.response.data]
        })
    }

    const transaction = await Transaction.create(
      { type, amount, clientIdFrom: idAll[0], clientIdTo: idAll[1] }
    )

    return response.status(201).json(transaction)
  }
}
