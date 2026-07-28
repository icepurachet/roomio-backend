import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { HotelImagesService } from './hotel_images.service';
import { CreateHotelImageDto } from './dto/create-hotel_image.dto';
import { UpdateHotelImageDto } from './dto/update-hotel_image.dto';

@Controller('hotel_images')
export class HotelImagesController {
    constructor(private readonly hotelImagesService: HotelImagesService) {}

    @Post()
    create(@Body() createHotelImageDto: CreateHotelImageDto) {
        return this.hotelImagesService.create(createHotelImageDto);
    }

    @Get()
    findAll() {
        return this.hotelImagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.hotelImagesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateHotelImageDto: UpdateHotelImageDto) {
        return this.hotelImagesService.update(id, updateHotelImageDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.hotelImagesService.remove(id);
    }
}
