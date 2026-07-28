import { PartialType } from "@nestjs/mapped-types";
import { CreateBookingTourDto } from "./create-booking_tour.dto";

export class UpdateBookingTourDto extends PartialType(CreateBookingTourDto) {}