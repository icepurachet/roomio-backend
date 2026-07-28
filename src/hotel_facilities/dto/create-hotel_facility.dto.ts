import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateHotelFacilityDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUrl()
    icon_url: string;

    @IsNotEmpty()
    @IsNumber()
    hotels_hotel_id: number;
}