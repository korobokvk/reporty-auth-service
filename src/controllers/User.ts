import { User as IUser } from '../interfaces/User'

export class User {
  public authUser
  constructor(private auth: IUser, email, data) {
    this.authUser = auth.authUser(email, data)
  }
}
