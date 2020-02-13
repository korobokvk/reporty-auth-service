export const createUser = (client, data, callback) => {
  const call = client.createUser((err, data) => {
    if (err) {
      throw err
    }

    callback(data)
  })
  call.write(data)
}
