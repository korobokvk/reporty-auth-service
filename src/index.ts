import grpc from 'grpc'
import { app } from './utils/grpc.util'
import AuthService from './rpc/auth.service'

const getServer = () => {
  const server = new grpc.Server()
  const { userAuth, createUser, isAuthUser } = new AuthService()
  server.addService(app['AuthService'].service, {
    userAuth,
    createUser,
    isAuthUser,
  })
  return server
}

const routeServer = getServer()
routeServer.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure())
routeServer.start()
