import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsDateString,
} from 'class-validator';
import { BookingType } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[6-9]\d{9}$/, {
    message: 'Phone must be a valid 10-digit Indian mobile number',
  })
  phone: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  service: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(['Morning', 'Afternoon', 'Evening'], {
    message: 'timeSlot must be Morning, Afternoon, or Evening',
  })
  timeSlot?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  message?: string;

  @IsOptional()
  @IsEnum(BookingType)
  type?: BookingType;

  // Honeypot — must be empty
  @IsOptional()
  @IsString()
  website?: string;
}
