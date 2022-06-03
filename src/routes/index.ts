import { Router } from 'express'

export const indexRouter = Router()

indexRouter.get('/', (request, response) => response.status(200).json({ message: 'Hello word index' }))
