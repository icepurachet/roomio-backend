import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel_image } from './hotel_image.entity';
import { Repository } from 'typeorm';
import { Hotel } from 'src/hotels/hotel.entity';
import { CreateHotelImageDto } from './dto/create-hotel_image.dto';
import { UpdateHotelImageDto } from './dto/update-hotel_image.dto';

@Injectable()
export class HotelImagesService {
    constructor(
        @InjectRepository(Hotel_image)
        private readonly hotelImageRepository: Repository<Hotel_image>,

        @InjectRepository(Hotel)
        private readonly hotelRepository: Repository<Hotel> 
    ) {}

    async create(createHotelImageDto: CreateHotelImageDto): Promise<Hotel_image> {
        const hotel = await this.hotelRepository.findOne({ where: {hotel_id: createHotelImageDto.hotel_id }})
        if (!hotel) {
            throw new NotFoundException('Hotel Not Found');
        }
        const hotelImage = this.hotelImageRepository.create({ image_url: createHotelImageDto.image_url, hotel})
        return this.hotelImageRepository.save(hotelImage)
    }

    findAll(): Promise<Hotel_image[]> {
        return this.hotelImageRepository.find({ relations: ['hotel'] });
    }

    async findOne(image_id: number): Promise<Hotel_image> {
        const hotelImage = await this.hotelImageRepository.findOne({ where: {image_id}, relations: ['hotel'] })
        if (!hotelImage) {
            throw new NotFoundException(`Hotel image with ID ${image_id} not found`)
        }
        return hotelImage;
    }

    async update(image_id: number, updateHotelImageDto: UpdateHotelImageDto): Promise<Hotel_image> {
        const hotelImage = await this.hotelImageRepository.findOne({ where: {image_id}})
        if (!hotelImage) {
            throw new NotFoundException('Hotel Image Not Found')
        }

        if (updateHotelImageDto.hotel_id) {
            const hotel = await this.hotelRepository.findOne({ where: { hotel_id: updateHotelImageDto.hotel_id } })
            if (!hotel) {
                throw new NotFoundException('Hotel Not Found')
            }
            hotelImage.hotel = hotel;
        }
        if (updateHotelImageDto.image_url !== undefined) {
            hotelImage.image_url = updateHotelImageDto.image_url;
        }
        return this.hotelImageRepository.save(hotelImage);
    }

    async remove(image_id: number): Promise<void> {
        const hotelImage = await this.findOne(image_id);
        await this.hotelImageRepository.remove(hotelImage)
    }
}
