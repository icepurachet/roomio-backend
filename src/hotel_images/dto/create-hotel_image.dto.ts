import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHotelImageDto {
    @IsNotEmpty()
    @IsString()
    image_url: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    hotel_id: number;
}