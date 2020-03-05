import { client } from './client.service'
import { AuthUserController } from '../controllers/auth-user.controller'
import { CreateUserController } from '../controllers/create-user.controller'
import { userStreamCallback } from '../utils/user.utils'

const authUserController = new AuthUserController(client)
const createUserController = new CreateUserController(client)

export const userAuth = (call): void => userStreamCallback(call, authUserController)

export const createUser = (call): void => userStreamCallback(call, createUserController)

export const isAuthUser = (JWT) => {
  // TODO: need to finish is auth method
  console.log('Check user')
  return true
}
