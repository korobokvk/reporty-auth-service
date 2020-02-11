import grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

const PROTO_PATH = __dirname + '/../app.proto'
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition)
const app = protoDescriptor.app

const userAuth = (call, callback): void => {
  call.on('data', (data, err) => {
    if (err) {
      throw err
    }
    call.write({ success: true })
  })
  call.on('end', (data, err) => {
    if (err) {
      throw err
    }
    call.end()
  })
}

const isAuthUser = (JWT) => {
  // TODO: need to finish is auth method
  console.log('Check user')
  return true
}
const getServer = () => {
  const server = new grpc.Server()
  server.addService(app['AuthService'].service, {
    userAuth,
    isAuthUser,
  })
  return server
}
const routeServer = getServer()
routeServer.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure())
routeServer.start()
