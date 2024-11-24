import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;
  @IsNotEmpty({ message: 'Password must be not be empty' })
  password: string;
  name: string;
  age: string;
  phone: string;
}
