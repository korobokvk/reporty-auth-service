import { userAuth } from '../utils/user.utils'
import { User } from '../interfaces/User'

export class AuthUserController implements User {
  private client: any

  constructor(client) {
    this.client = client
  }

  authUser(email: string, password: string): Promise<string> {
    return userAuth(this.client, email, password)
  }
}
