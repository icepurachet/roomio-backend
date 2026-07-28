import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, Length, Max, Min, ValidateNested } from "class-validator";
import { CreateHotelFacilityDto } from "src/hotel_facilities/dto/create-hotel_facility.dto";
import { CreateHotelImageDto } from "src/hotel_images/dto/create-hotel_image.dto";
import { CreateNearbyPlaceDto } from "src/nearby_places/dto/create-nearby_place.dto";
import { CreateRoomDto } from "src/rooms/dto/create-room.dto";
import { CreateTourDto } from "src/tours/dto/create-tour.dto";

export class CreateHotelFullDto {
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
    owner_id: number;

    @ValidateNested({ each: true })
    @Type(() => CreateNearbyPlaceDto)
    @IsArray()
    nearby_places: CreateNearbyPlaceDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateHotelFacilityDto)
    @IsArray()
    hotel_facilities: CreateHotelFacilityDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateHotelImageDto)
    @IsArray()
    hotel_images: CreateHotelImageDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateTourDto)
    @IsArray()
    tours: CreateTourDto[];

    @ValidateNested({ each: true })
    @Type(() => CreateRoomDto)
    @IsArray()
    rooms: CreateRoomDto[];
}