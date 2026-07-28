import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BookingRoomsService } from './booking_rooms.service';
import { CreateBookingRoomDto } from './dto/create-booking_room.dto';
import { UpdateBookingRoomDto } from './dto/update-booking_room.dto';

@Controller('booking_rooms')
export class BookingRoomsController {
    constructor(private readonly bookingRoomsService: BookingRoomsService) {}

    @Post()
    create(@Body() createBookingRoomDto: CreateBookingRoomDto) {
        return this.bookingRoomsService.create(createBookingRoomDto)
    }

    @Get()
    findAll() {
        return this.bookingRoomsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookingRoomsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateBookingRoomDto: UpdateBookingRoomDto) {
        return this.bookingRoomsService.update(id, updateBookingRoomDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookingRoomsService.remove(id);
    }
}
