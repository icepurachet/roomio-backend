import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { BookingToursService } from './booking_tours.service';
import { CreateBookingTourDto } from './dto/create-booking_tour.dto';
import { UpdateBookingTourDto } from './dto/update-booking_tour.dto';


@Controller('booking_tours')
export class BookingToursController {
    constructor(private readonly bookingToursService: BookingToursService) {}

    @Post()
    create(@Body() createBookingTourDto: CreateBookingTourDto) {
        return this.bookingToursService.create(createBookingTourDto);
    }

    @Get()
    findAll() {
        return this.bookingToursService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.bookingToursService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateBookingTourDto: UpdateBookingTourDto) {
        return this.bookingToursService.update(id, updateBookingTourDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.bookingToursService.remove(id)
    }
}
