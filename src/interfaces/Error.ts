export default interface IError {
  baseErrorConstructor: (code: number, message: string) => IBaseError
  conflictError: (code: number, message?: string) => IBaseError
}

export interface IBaseError {
  code: number
  message: string
}
