import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Request,
  NotImplementedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    if (authDto) {
      return this.authService.authenticate(authDto);
    }
    throw new NotImplementedException('This method is not implemented');
  }

  @UseGuards(PassportJwtAuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    return request.user;
  }
}
