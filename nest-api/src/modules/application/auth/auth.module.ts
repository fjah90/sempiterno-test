import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { CRUDMessages } from 'src/shared/utils/message.enum';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: CRUDMessages.secret,
      signOptions: { expiresIn: process.env.ENVIROMENT == 'DEV' ? '35s' : '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
