import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserByEmailDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
