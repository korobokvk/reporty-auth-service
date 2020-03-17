import crypto from 'crypto'
import config from 'config'

const HASH_ROUNDS: number = config.get('hashRounds')
const KEY_LENGTH: number = config.get('keyLength')
const APP_SALT: string = config.get('keyForHash')

export default class CryptoService {
  public saltData = (data, salt) => {
    return crypto.pbkdf2Sync(data, `${salt}${APP_SALT}`, HASH_ROUNDS, KEY_LENGTH, 'sha512').toString('hex')
  }

  public compareWithHash = (data, hashedData, salt) => {
    const cryptData = crypto.pbkdf2Sync(data, `${salt}${APP_SALT}`, HASH_ROUNDS, KEY_LENGTH, 'sha512').toString('hex')
    return cryptData === hashedData
  }

  public createSalt = () => {
    return crypto.randomBytes(16).toString('hex')
  }
}
