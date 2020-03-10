import config from 'config'
import jwt from 'jsonwebtoken'

export default class JwtService {
  public generateAuthToken = (user) => {
    const token = jwt.sign(user, config.get('privateKey'))
    return token
  }

  public decodeAuthToken = (user) => {
    const { token } = user
    return jwt.verify(token, config.get('privateKey'))
  }
}
