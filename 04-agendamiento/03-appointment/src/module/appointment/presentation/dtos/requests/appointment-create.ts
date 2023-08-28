import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class AppointmentCreateDto {
  @IsNotEmpty()
  @IsString()
  patient: string;

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
}
