import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto'
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tours')
export class ToursController {
    constructor(private readonly tourService: ToursService) {}

    @Post()
    create(@Body() createTourDto: CreateTourDto) {
        return this.tourService.create(createTourDto);
    }

    @Get()
    findAll() {
        return this.tourService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.tourService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateTourDto: UpdateTourDto) {
        return this.tourService.update(id, updateTourDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.tourService.remove(id);
    }
}
