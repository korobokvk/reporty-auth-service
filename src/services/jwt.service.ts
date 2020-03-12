import config from 'config'
import jwt from 'jsonwebtoken'

export default class JwtService {
  public getTokenFromBearer = (jwt) => jwt.split(' ')[1]

  public generateAuthToken = (data) => {
    const expiresIn = '1m'
    const token = jwt.sign({ data }, config.get('privateKey'), { expiresIn })
    return token
  }

  public verifyAuthToken = (data) => {
    const token = this.getTokenFromBearer(data)
    try {
      return jwt.verify(token, config.get('privateKey'))
    } catch (err) {
      throw err
    }
  }

  public decodeAuthToken = (data) => {
    const token = this.getTokenFromBearer(data)
    return jwt.decode(token)
  }
}
