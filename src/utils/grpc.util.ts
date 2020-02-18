import grpc, { GrpcObject } from 'grpc'
import { loadSync, PackageDefinition, Options } from '@grpc/proto-loader'

const PROTO_PATH = __dirname + '/../../app.proto'
const options: Options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
}
const packageDefinition: PackageDefinition = loadSync(PROTO_PATH, options)
const protoDescriptor: GrpcObject = grpc.loadPackageDefinition(packageDefinition)

export const app = protoDescriptor.app
