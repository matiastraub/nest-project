import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //| Promise<boolean> | Observable<boolean>
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization; //'Bearer <token>'
    const token: string = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(); //401
    }
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        id: tokenPayload.sub,
        username: tokenPayload.email,
      };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
