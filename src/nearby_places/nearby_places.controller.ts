import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { NearbyPlacesService } from './nearby_places.service';
import { CreateNearbyPlaceDto } from './dto/create-nearby_place.dto';
import { Nearby_place } from './nearby_place.entity';
import { UpdateNearbyPlaceDto } from './dto/update-nearby_place.dto';

@Controller('nearby_places')
export class NearbyPlacesController {
    constructor(private readonly nearbyPlacesService: NearbyPlacesService) {}

    @Post()
    create(@Body() createNearbyPlaceDto: CreateNearbyPlaceDto): Promise<Nearby_place> {
        return this.nearbyPlacesService.create(createNearbyPlaceDto)
    }

    @Get()
    findAll(): Promise<Nearby_place[]> {
        return this.nearbyPlacesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Nearby_place> {
        return this.nearbyPlacesService.findOne(id) ;
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateNearbyPlaceDto: UpdateNearbyPlaceDto): Promise<Nearby_place> {
        return this.nearbyPlacesService.update(id, updateNearbyPlaceDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.nearbyPlacesService.remove(id)
    }
}
