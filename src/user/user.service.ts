import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
//Placeholder data
const users: User[] = [
  { id: 1, email: 'matato@hola.cl', password: '12345' },
  { id: 2, email: 'john.doe@hello.com', password: 'holahola' },
];

@Injectable()
export class UserService {
  async findUserByName(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }
}
