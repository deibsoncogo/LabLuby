import { Router } from 'express'
import { clientRouter } from './clientRouter'

const indexRouter = Router()

indexRouter.get('/', (request, response) => response.status(200).json(
  { message: 'Hello world do service' },
))

indexRouter.use('/client', clientRouter)

export { indexRouter }
