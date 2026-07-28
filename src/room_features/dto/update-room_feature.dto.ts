import { PartialType } from "@nestjs/mapped-types";
import { CreateRoomFeatureDto } from "./create-room_feature.dto";

export class UpdateRoomFeatureDto extends PartialType(CreateRoomFeatureDto) {}