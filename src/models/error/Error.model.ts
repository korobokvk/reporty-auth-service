import IError from '../../interfaces/Error'

export default class ErrorModel {
  public JsonWebTokenError
  public TokenExpiredError
  public PasswordIsIncorrect
  public UserNotFount
  public Conflict
  public UnknownError

  constructor(private ctrl: IError) {
    this.JsonWebTokenError = ctrl.baseErrorConstructor
    this.TokenExpiredError = ctrl.baseErrorConstructor
    this.PasswordIsIncorrect = ctrl.baseErrorConstructor
    this.UserNotFount = ctrl.baseErrorConstructor
    this.UnknownError = ctrl.baseErrorConstructor
    this.Conflict = ctrl.conflictError
  }
}
