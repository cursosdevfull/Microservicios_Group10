import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from "class-validator";

export enum CountryCode {
  CO = "CO",
  PE = "PE",
  MX = "MX",
}

export class AppointmentCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  medicId: number;

  @IsNotEmpty()
  @IsNumberString()
  specialtyId: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  centerId: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CountryCode)
  isoCountryCode: CountryCode;
}
