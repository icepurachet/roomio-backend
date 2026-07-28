import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateBookingTourDto {
    @IsInt()
    @Min(1)
    guest: number;

    @IsNotEmpty()
    @IsInt() // แนะนำใช้ IsInt แทน IsNumber เพราะ tour_id น่าจะเป็น integer
    tours_tour_id: number;

    @IsNotEmpty()
    @IsInt()
    payments_payment_id: number;
}
