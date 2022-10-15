import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import { DateTransactionValidator } from 'App/Validators/TransactionValidator'
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

  public async show ({ params, request, response }: HttpContextContract) {
    await request.validate(DateTransactionValidator)

    const { createdAtFrom, createdAtTo } = request.all()

    if (createdAtFrom > createdAtTo) {
      return response.status(406).json({ error: 'Datas informada de forma invertida' })
    }

    const transaction = await Transaction.query()
      .where((query) => {
        createdAtFrom && query.andWhere('createdAt', '>=', new Date(`${createdAtFrom} 00:00:00`))
        createdAtTo && query.andWhere('createdAt', '<=', new Date(`${createdAtTo} 23:59:59`))
      })
      .where((query) => {
        query.orWhere('clientIdFrom', params.id)
        query.orWhere('clientIdTo', params.id)
      })
      .orderBy('createdAt', 'asc')

    const client = await axios
      .get(`${process.env.BASE_URL_MS}/client/${params.id}`)
      .then((response) => {
        return [response.status, response.data]
      }).catch((error) => {
        return [error.response.status, error.response.data]
      })

    return response.status(200).json({ transaction, currentBalance: client[1].currentBalance})
  }
}
