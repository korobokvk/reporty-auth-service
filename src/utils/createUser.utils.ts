export const createUser = (client, data): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.createUser(data, (err, response) => {
      if (err) {
        reject(err)
      }
      resolve(response)
    })
  })
}
