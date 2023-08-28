import { IsNotEmpty, IsString } from "class-validator";

export class UserByIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
