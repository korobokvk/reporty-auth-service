import { createUser } from '../utils/user.utils'
import { User } from '../interfaces/User'

export class CreateUserController implements User {
  private client: any

  constructor(client) {
    this.client = client
  }

  authUser(email: string, password: string): Promise<boolean> {
    return createUser(this.client, email, password)
  }
}
