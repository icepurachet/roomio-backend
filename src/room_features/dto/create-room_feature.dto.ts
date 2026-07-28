import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateRoomFeatureDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUrl()
    icon_url: string;

    @IsNotEmpty()
    @IsNumber()
    rooms_room_id: number;
}