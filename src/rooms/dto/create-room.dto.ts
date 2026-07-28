import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, Length, Max, Min } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @Length(1, 50)
    room_type: string ;

    @IsUrl()
    image_url: string;
    
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2})
    @Min(0)
    price: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @Max(10000) // สูงสุด 10,000 บาท สมมติว่าราคานี้เพียงพอ
    extra_bed: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(20)
    capacity: number; 
    
    @IsInt()
    @IsNotEmpty()
    @Type(() => Number)
    hotel_id: number;

}