import { app } from '../utils/grpc.util'
import grpc from 'grpc'

const dbProviderUrl = process.env.DB_PROVIDER_URL

export const client = new app['DataBaseProvider'](dbProviderUrl, grpc.credentials.createInsecure())
