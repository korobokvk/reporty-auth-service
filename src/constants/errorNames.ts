import { status } from 'grpc'

export const ERROR_NAMES = {
  JsonWebTokenError: 'JsonWebTokenError',
  TokenExpiredError: 'TokenExpiredError',
  Unauthorized: status.UNAUTHENTICATED,
  BadRequest: status.INTERNAL,
  Conflict: status.ALREADY_EXISTS,
}
