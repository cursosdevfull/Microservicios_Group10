import { IsArray, IsOptional, IsString } from "class-validator";

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsOptional()
  @IsArray()
  roles: number[];
}
