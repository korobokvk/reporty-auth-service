import { app } from '../utils/grpc.util'
import grpc from 'grpc'

export const client = new app['DataBaseProvider']('host.docker.internal:3010', grpc.credentials.createInsecure())
