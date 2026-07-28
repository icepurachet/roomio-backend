import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RoomFeaturesService } from './room_features.service';
import { CreateRoomFeatureDto } from './dto/create-room_feature.dto';
import { UpdateRoomFeatureDto } from './dto/update-room_feature.dto';

@Controller('room_features')
export class RoomFeaturesController {
    constructor(private readonly roomFeaturesService: RoomFeaturesService) {}

    @Post()
    create(@Body() createRoomFeatureDto: CreateRoomFeatureDto) {
        return this.roomFeaturesService.create(createRoomFeatureDto);
    }

    @Get()
    findAll() {
        return this.roomFeaturesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.roomFeaturesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRoomFeatureDto: UpdateRoomFeatureDto) {
        return this.roomFeaturesService.update(id, updateRoomFeatureDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.roomFeaturesService.remove(id);
    }
}
