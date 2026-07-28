import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { Owner } from './owner.entity';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) {}

    @Post()
    create(@Body() createOwnerDto: CreateOwnerDto): Promise<Owner> {
        return this.ownersService.create(createOwnerDto);
    }

    @Get()
    findAll(): Promise<Owner[]> {
        return this.ownersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Owner> {
        return this.ownersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
        return this.ownersService.update(id, updateOwnerDto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.ownersService.remove(id)
    }
}
