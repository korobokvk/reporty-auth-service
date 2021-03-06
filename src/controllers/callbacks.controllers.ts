import JwtService from '../services/jwt.service'
import CryptoService from '../services/crypto.service'
import ErrorModel from '../models/error/Error.model'
import ErrorController from './errors.controller'
import { ERROR_NAMES } from '../constants/errorNames'
import _ from 'lodash'

const crypto = new CryptoService()
const CRASHED_CREDENTIALS_MESSAGE = 'Email address or password is incorrect'
export default class CallbacksController extends JwtService {
  private errorHandler: ErrorModel

  constructor(private callback, private userData, private client) {
    super()
    this.errorHandler = new ErrorModel(new ErrorController())
  }

  private sendWithJwt = (err, data) => {
    if (err) {
      const unknownError = this.errorHandler.UnknownError(ERROR_NAMES.Conflict, err.details)
      this.callback(unknownError, null)
      return
    }
    const jwt = this.generateAuthToken(data)
    this.callback(null, { JWT: jwt })
  }

  private getDataWithHashedPassword = () => {
    const { password, email } = this.userData
    const salt = crypto.createSalt()
    const hashedPassword = crypto.saltData(password, salt)
    return { email, password: hashedPassword, salt }
  }

  public userCreateCallback = () => {
    this.client.createUser(this.getDataWithHashedPassword(), (err, data) => {
      if (err) {
        const duplicateError = this.errorHandler.Conflict(ERROR_NAMES.Conflict)
        this.callback(duplicateError, null)
      } else {
        const { id } = data
        this.sendWithJwt(null, id)
      }
    })
  }

  public userAuthCallback = () => {
    const { email } = this.userData
    this.client.findByEmail({ email }, this.compareCredentials)
  }

  public compareCredentials = (err, data) => {
    if (err) {
      const error = this.errorHandler.PasswordIsIncorrect(ERROR_NAMES.BadRequest, CRASHED_CREDENTIALS_MESSAGE)
      this.callback(error, null)
      return
    }
    const { password } = this.userData
    const { password: receivedPassword, salt, id } = data
    const compare = crypto.compareWithHash(password, receivedPassword, salt)
    if (compare) {
      this.sendWithJwt(null, id)
    } else {
      const error = this.errorHandler.PasswordIsIncorrect(ERROR_NAMES.BadRequest, CRASHED_CREDENTIALS_MESSAGE)
      this.callback(error, null)
    }
    return
  }

  public tokenValidation = () => {
    const { JWT } = this.userData
    try {
      const tokenData = this.verifyAuthToken(JWT)
      const id = _.get(tokenData, 'data')
      this.client.findById({ id }, (err, data) => {
        if (err) {
          this.callback(err, null)
        }
        this.callback(null, { JWT: this.getTokenFromBearer(JWT) })
      })
    } catch (err) {
      if (err.name === ERROR_NAMES.TokenExpiredError) {
        this.updateToken(JWT)
      } else {
        const errorMessage = this.errorHandler.JsonWebTokenError(ERROR_NAMES.Unauthorized, 'Unauthorized')
        this.callback(errorMessage, null)
      }
    }
  }

  public updateToken(oldToken) {
    const decoded = this.decodeAuthToken(oldToken)
    this.sendWithJwt(null, decoded['data'])
  }
}
