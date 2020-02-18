import { client } from './client.service'
import { createUser } from '../utils/createUser.utils'

export const userAuth = (call): void => {
  call.on('data', (data, err) => {
    if (err) {
      throw err
    }

    const sendDataToClient = (data) => {
      call.write(data)
      call.end()
    }

    createUser(client, data, sendDataToClient)
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
