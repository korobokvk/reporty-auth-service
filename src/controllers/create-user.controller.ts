import { createUser } from '../utils/createUser.utils'

export class CreateUserController {
  private client: any
  private data: {
    email: string
    password: string
  }
  constructor(client, data) {
    this.client = client
    this.data = data
  }

  createUser() {
    return createUser(this.client, this.data)
  }
}
