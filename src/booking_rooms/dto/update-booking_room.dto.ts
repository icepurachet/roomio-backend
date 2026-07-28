import { PartialType } from "@nestjs/mapped-types";
import { CreateBookingRoomDto } from "./create-booking_room.dto";

export class UpdateBookingRoomDto extends PartialType(CreateBookingRoomDto) {}