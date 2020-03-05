import { client } from './client.service'
import { CreateUserController } from '../controllers/create-user.controller'

export const userAuth = (call): void => {
  call.on('data', (data, err) => {
    if (err) {
      throw err
    }
    const createUserController = new CreateUserController(client, data)

    createUserController
      .createUser()
      .then((response) => {
        call.write(response)
        call.end()
      })
      .catch((err) => {
        call.emit('error', err)
      })
  })
  call.on('end', (data, err) => {
    if (err) {
      throw err
    }
  })
}

export const isAuthUser = (JWT) => {
  // TODO: need to finish is auth method
  console.log('Check user')
  return true
}
