import { Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request } from 'express'
import { CreateUser } from './auth.interfaces'
import { Observable } from 'rxjs'

@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post()
  getAuth(@Req() request: Request): Observable<CreateUser> {
    console.log('AUUUTH')
    return this.authService.createUser(request)
  }
}
