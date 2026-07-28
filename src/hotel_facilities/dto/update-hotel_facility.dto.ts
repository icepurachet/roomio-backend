import { PartialType } from "@nestjs/mapped-types";
import { CreateHotelFacilityDto } from "./create-hotel_facility.dto";

export class UpdateHotelFacilityDto extends PartialType(CreateHotelFacilityDto) {}