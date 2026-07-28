import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from 'src/hotels/hotel.entity'
@Entity('hotel_images')
export class Hotel_image {
    @PrimaryGeneratedColumn()
    image_id: number;

    @Column()
    image_url: string;

    @ManyToOne(() => Hotel, hotel => hotel.hotel_images, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'hotels_hotel_id' })
    hotel: Hotel;

}