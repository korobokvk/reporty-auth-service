import JwtService from '../services/jwt.service'
import CryptoService from '../services/crypto.service'
import _ from 'lodash'
import { compare } from 'bcrypt'

const crypto = new CryptoService()

export default class CallbacksController extends JwtService {
  constructor(private callback, private userData?) {
    super()
  }

  public sendWithJwt = (err, data) => {
    if (err) {
      // TODO: implement errors controller here instead of clb
      this.callback(err, null)
    }
    const { password, ...rest } = data
    const jwt = this.generateAuthToken(rest)
    this.callback(null, { JWT: jwt })
  }

  public checkTokenIsValid = (err, data) => {
    if (err) {
      // TODO: implement errors controller here instead of clb
      this.callback(err, null)
    }

    this.callback(null, true)
  }

  public compareAndSendWithJwt = async (err, data) => {
    if (err || _.isEmpty(this.userData)) {
      // TODO: implement errors controller here instead of clb
      this.callback(err, null)
    }

    const { password, ...rest } = data
    const { password: receivedData } = this.userData
    try {
      const compared = await crypto.compareWithHash(receivedData, password)
      const jwt = this.generateAuthToken(rest)
      if (compared) {
        this.callback(null, { JWT: jwt })
      }
      //this.callback('Unauthorized', null)
    } catch (err) {
      this.callback(err, null)
    }
  }
}
