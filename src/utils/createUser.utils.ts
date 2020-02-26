export const createUser = (client, data) => {
  return new Promise((resolve, reject) => {
    const call = client.createUser((err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
    call.write(data)
    return call
  })
}
