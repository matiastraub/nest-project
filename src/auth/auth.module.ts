import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      //Placeholder secret
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
