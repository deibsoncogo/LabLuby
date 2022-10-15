import { container } from 'tsyringe'
import { IUserRepository } from '../modules/users/repositories/iUserRepository'
import { UserRepository } from '../modules/users/repositories/userRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
