import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { AccessModule } from './access/access.module'

@Module({
  imports: [AuthModule, AccessModule],
  controllers: [AppController],
  providers: [AppService, AuthModule, AccessModule],
})
export class AppModule {}
