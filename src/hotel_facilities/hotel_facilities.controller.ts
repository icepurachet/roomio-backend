import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HotelFacilitiesService } from './hotel_facilities.service';
import { CreateHotelFacilityDto } from './dto/create-hotel_facility.dto';
import { UpdateHotelFacilityDto } from './dto/update-hotel_facility.dto';

@Controller('hotel_facilities')
export class HotelFacilitiesController {
    constructor(private readonly hotelFacilitiesService: HotelFacilitiesService) {}

    @Post()
    create(@Body() createHotelFacilityDto: CreateHotelFacilityDto) {
        return this.hotelFacilitiesService.create(createHotelFacilityDto);
    }

    @Get()
    findAll() {
        return this.hotelFacilitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.hotelFacilitiesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateHotelFacilityDto: UpdateHotelFacilityDto) {
        return this.hotelFacilitiesService.update(id, updateHotelFacilityDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.hotelFacilitiesService.remove(id);
    }
}
