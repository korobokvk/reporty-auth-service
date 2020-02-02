import { Controller, Get, Body, Headers } from '@nestjs/common'
import { AccessService } from './access.service'

class CreateCatDto {
  readonly token: string
}

@Controller('check-access')
export class AccessController {
  constructor(private accessService: AccessService) {}

  @Get()
  checkAccess(@Headers() { authorization }) {
    console.log(authorization)
    return this.accessService.checkAccess(authorization)
  }
}
