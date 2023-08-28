import { IsNotEmpty, IsNumberString } from "class-validator";

export class UserByPageDto {
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @IsNotEmpty()
  @IsNumberString()
  size: number;
}
