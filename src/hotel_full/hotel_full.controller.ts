import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HotelFullService } from './hotel_full.service';
import { CreateHotelFullDto } from './dto/create-hotel_full.dto';
import { UpdateHotelFullDto } from './dto/update-hotel.dto';
import { Hotel } from './hotel_full.entity';

@Controller('hotel_full')
export class HotelFullController {
    constructor(private readonly hotelFullService: HotelFullService) {}

    @Post()
    async create(@Body() createHotelFullDto: CreateHotelFullDto): Promise<Hotel> {
        return this.hotelFullService.create(createHotelFullDto) ;
    }

    @Get()
    async findAll(): Promise<Hotel[]> {
        return this.hotelFullService.findAll();
    }

    @Get(':hotel_id')
    async findOne(@Param('hotel_id', ParseIntPipe) hotel_id: number): Promise<Hotel> {
        return this.hotelFullService.findOne(hotel_id);
    }

    @Patch(':hotel_id')
    async update(@Param('hotel_id', ParseIntPipe) hotel_id: number, @Body() updateHotelFullDto: UpdateHotelFullDto ): Promise<Hotel> {
        return this.hotelFullService.update(hotel_id, updateHotelFullDto);
    }

    @Delete(':hotel_id')
    async remove(@Param('hotel_id', ParseIntPipe) hotel_id: number): Promise<void> {
        return this.hotelFullService.remove(hotel_id);
    }
}
