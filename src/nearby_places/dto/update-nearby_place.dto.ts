import { PartialType } from "@nestjs/mapped-types";
import { CreateNearbyPlaceDto } from "./create-nearby_place.dto";

export class UpdateNearbyPlaceDto extends PartialType(CreateNearbyPlaceDto) {}