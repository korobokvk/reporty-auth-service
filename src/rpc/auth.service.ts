import { client } from './client.service'
import { IUser, ICredentials, ICallback } from '../interfaces/User'
import CallbacksController from '../controllers/callbacks.controllers'
import JwtService from '../services/jwt.service'
import CryptoService from '../services/crypto.service'

const crypto = new CryptoService()
export default class AuthService implements IUser {
  public createUser = async (call: ICredentials, callback: ICallback) => {
    const { request: credentials } = call
    const { password, email } = credentials
    const saltPassword = await crypto.saltData(password)
    const { sendWithJwt } = new CallbacksController(callback)
    client.createUser({ email, password: saltPassword }, sendWithJwt)
  }

  public userAuth = (call: ICredentials, callback) => {
    const { request: credentials } = call
    const { compareAndSendWithJwt } = new CallbacksController(callback, credentials)
    client.findByEmail(credentials, compareAndSendWithJwt)
  }

  public isAuthUser = (call: ICredentials, callback: ICallback) => {
    const { request: jwt } = call
    const { checkTokenIsValid } = new CallbacksController(callback)
    const error = new Error(JSON.stringify({ code: 401, message: 'Unauthorized' }))
    const isUserValid = jwt ? new JwtService().decodeAuthToken(jwt) : checkTokenIsValid(error, null)
    client.findById(isUserValid, checkTokenIsValid)
  }
}
