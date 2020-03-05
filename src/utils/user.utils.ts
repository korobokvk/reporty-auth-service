import { User } from '../controllers/User'

export const createUser = (client, email, password): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    client.createUser({ email, password }, (err, response) => {
      if (err) {
        reject(err)
      }
      resolve(response)
    })
  })
}

export const userAuth = (client, email, password): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.userAuth({ email, password }, (err, response) => {
      if (err) {
        reject(err)
      }
      resolve(response)
    })
  })
}

export const userStreamCallback = (call, userController) => {
  call.on('data', ({ email, password }, err) => {
    if (err) {
      throw err
    }

    const user = new User(userController, email, password)

    user.authUser
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
