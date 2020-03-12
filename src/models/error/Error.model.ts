import IError from '../../interfaces/Error'

export default class ErrorModel {
  public JsonWebTokenError
  public TokenExpiredError
  public PasswordIsIncorrect
  public UserNotFount
  public Conflict

  constructor(private ctrl: IError) {
    this.JsonWebTokenError = ctrl.baseErrorConstructor
    this.TokenExpiredError = ctrl.baseErrorConstructor
    this.PasswordIsIncorrect = ctrl.baseErrorConstructor
    this.UserNotFount = ctrl.baseErrorConstructor
    this.Conflict = ctrl.baseErrorConstructor
  }
}
