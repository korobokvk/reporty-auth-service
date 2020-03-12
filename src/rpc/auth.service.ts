import { client } from './client.service'
import { IUser, ICredentials, ICallback } from '../interfaces/User'
import CallbacksController from '../controllers/callbacks.controllers'
import CryptoService from '../services/crypto.service'

const crypto = new CryptoService()
export default class AuthService implements IUser {
  public createUser = async (call: ICredentials, callback: ICallback) => {
    const { request: credentials } = call
    const callbacksController = new CallbacksController(callback, credentials, client)
    callbacksController.userCreateCallback()
  }

  public userAuth = (call: ICredentials, callback) => {
    const { request: credentials } = call
    const callbacksController = new CallbacksController(callback, credentials, client)
    callbacksController.userAuthCallback()
  }

  public isAuthUser = (call: ICredentials, callback: ICallback) => {
    const { request: jwt } = call
    const callbackController = new CallbacksController(callback, jwt, client)
    callbackController.tokenValidation()
  }
}
