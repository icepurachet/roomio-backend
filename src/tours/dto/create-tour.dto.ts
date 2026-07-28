import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Length, Min } from "class-validator";

export class CreateTourDto {
    @IsString()
    @Length(1, 100)
    name: string; 

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2})
    @Min(0)
    price: number;            

    @IsUrl()
    image_url: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @Type(() => Number)
    @IsInt({ message: 'hotels_hotel_id must be an integer'})
    @IsNotEmpty({ message: 'hotels_hotel_id is required'})
    hotels_hotel_id: number;
    
}