import { Injectable } from '@nestjs/common'

@Injectable()
export class AccessService {
  checkAccess(token) {
    'test commit '
    return !!token
  }
}
