export interface IUser {
  createUser(call: ICredentials, callback: ICallback): void
  userAuth(call: ICredentials, callback: ICallback): void
  isAuthUser(call: ICredentials, callback: ICallback): void
}

export interface ICredentials {
  request: {
    email: string
    password: string
  }
}

export interface ICallback {
  callback(err: Error, data: ICredentials | boolean | string): void
}
