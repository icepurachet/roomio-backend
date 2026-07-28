import { IsNumber, IsString, Length, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @IsString()
  @Length(1, 50, { message: 'payment_type ต้องมีความยาว 1-50 ตัวอักษร' })
  payment_type: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0)
  amount: number;

  @IsNumber()
  @Type(() => Number)
  @Min(1)
  users_user_id: number;
}
