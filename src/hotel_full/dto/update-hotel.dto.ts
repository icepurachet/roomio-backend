import { PartialType } from "@nestjs/mapped-types";
import { CreateHotelFullDto } from "./create-hotel_full.dto";

export class UpdateHotelFullDto extends PartialType(CreateHotelFullDto) {}