import jwt from 'jsonwebtoken'
import { hash, compare } from 'bcrypt'
import config from 'config'

const HASH_ROUNDS: number = config.get('hashRounds')

export default class CryptoService {
  public saltData = async (data) => {
    return await hash(data, HASH_ROUNDS)
  }

  public compareWithHash = async (data, hashedData) => {
    return await compare(data, hashedData)
  }
}
