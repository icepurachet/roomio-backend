import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateBookingRoomDto {
  @IsNotEmpty()
  @IsDateString()
  check_in_date: string;

  @IsNotEmpty()
  @IsDateString()
  check_out_date: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  total_price: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  guest: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  rooms_room_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  payments_payment_id: number;

}
