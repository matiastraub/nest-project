export class UserResponseDto {
  id: number;
  email: string;
  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}
