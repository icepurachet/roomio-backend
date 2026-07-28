import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CreateHotelDto {
    @IsString()
    @Length(1, 50)
    hotel_name: string;

    @IsString()
    @Length(1, 50)
    country: string;

    @IsNumber({ maxDecimalPlaces: 1})
    @Min(0)
    @Max(10)
    @Type(() => Number)
    rating: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    owner_id: number;
}