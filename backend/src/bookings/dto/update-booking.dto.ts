import { IsEnum, IsOptional } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingStatusDto {
  @IsEnum(BookingStatus)
  status: BookingStatus;
}

export class BookingQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  type?: string;

  @IsOptional()
  from?: string;

  @IsOptional()
  to?: string;

  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}
