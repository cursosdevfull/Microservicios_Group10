import { Type } from "class-transformer";
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from "class-validator";

export enum GENDER {
  M = "M",
  F = "F",
}

export class Address {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  complement: string;
}

export class Disease {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;
}

export class MedicInsertDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(5)
  cmp: string;

  @IsOptional()
  @IsString()
  @MinLength(7)
  @MaxLength(40)
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(1)
  @IsEnum(GENDER)
  gender: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Address)
  address: Address[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  nationality: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  specialty: number;

  @IsOptional()
  diseases: Disease[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(18)
  @Max(80)
  age: number;
}
