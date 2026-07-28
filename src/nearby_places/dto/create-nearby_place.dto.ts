import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNearbyPlaceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    hotels_hotel_id: number;
}