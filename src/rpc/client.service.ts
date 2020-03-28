import { app } from '../utils/grpc.util'
import grpc from 'grpc'

const dbProviderUrl = process.env.DB_SERVICE

export const client = new app['DataBaseProvider'](dbProviderUrl, grpc.credentials.createInsecure())
