import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

type SignInData = { id: number; email: string };
type AuthResult = { accessToken: string; id: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async authenticate(AuthDto: AuthDto): Promise<AuthResult> {
    const user = await this.validateUser(AuthDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.signin(user);
  }

  async validateUser(AuthDto: AuthDto): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(AuthDto.email);
    if (user && user.password == AuthDto.password) {
      return { email: user.email, id: user.id };
    }
    return null;
  }

  async signin(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.id,
      username: user.email,
    };
    const accessToken = await this.jwt.signAsync(tokenPayload);
    return { accessToken, email: user.email, id: user.id };
  }
}
