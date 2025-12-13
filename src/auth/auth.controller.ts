import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  NotImplementedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() AuthDto: AuthDto) {
    if (AuthDto) {
      return this.authService.authenticate(AuthDto);
    }
    throw new NotImplementedException('This method is not implemented');
  }
}
