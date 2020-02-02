import { Injectable, HttpService, UnprocessableEntityException, HttpException } from '@nestjs/common'
import { map } from 'rxjs/operators'
import { CreateUser } from './auth.interfaces'
import { Observable } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  createUser({ body: user }): Observable<CreateUser> {
    const validate = this.validate(user)
    if (!validate) {
      return this.http.post(process.env.AUTH_SERVICE).pipe(
        map((response) => {
          return response.data
        }),
      )
    } else {
      throw validate
    }
  }

  loginUser({ email, password }) {}

  validate({ email, password, rePassword }): HttpException {
    if (!email) {
      return new UnprocessableEntityException({
        error: 'Email is not exist',
      })
    }
    if (!password) {
      return new UnprocessableEntityException({
        error: 'Password is not exist',
      })
    }
    if (!rePassword) {
      return new UnprocessableEntityException({
        error: 'Repeat your password',
      })
    }
    if (password !== rePassword) {
      return new UnprocessableEntityException({
        error: 'Password should be the same',
      })
    }
    return null
  }
}
