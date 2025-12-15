import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guards';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @UseGuards(PassportLocalGuard)
  signin(@Request() request: { user: { email: string; id: number } }) {
    return this.authService.signin(request.user);
  }

  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request: { user: { email: string; id: number } }) {
    return request.user;
  }
}
