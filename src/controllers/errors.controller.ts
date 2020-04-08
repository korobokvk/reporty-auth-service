import IError, { IBaseError } from '../interfaces/Error'
import grpc from 'grpc'
export default class ErrorController implements IError {
  public baseErrorConstructor = (code, message): IBaseError => ({
    code,
    message,
  })

  public conflictError = (code, message = 'Credentials already in use'): IBaseError =>
    this.baseErrorConstructor(code, message)
}
