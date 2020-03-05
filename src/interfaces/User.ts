export interface User {
  authUser(email: string, password: string): Promise<string | boolean>
}
