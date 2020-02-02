import { Injectable } from '@nestjs/common'

@Injectable()
export class AccessService {
  checkAccess(token) {
    return !!token
  }
}
