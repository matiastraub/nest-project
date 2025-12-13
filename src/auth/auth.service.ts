import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type SignInData = { id: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(AuthDto: AuthDto): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(AuthDto.email);
    if (user && user.password == AuthDto.password) {
      return { email: user.email, id: user.id };
    }
    return null;
  }
}
