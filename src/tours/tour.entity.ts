import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hotel } from 'src/hotels/hotel.entity'
import { Booking_tour } from "src/booking_tours/booking_tour.entity";
@Entity('tours')
export class Tour {
    @PrimaryGeneratedColumn()
    tour_id: number ;

    @Column()
    name: string ; 
    
    @Column('decimal', { precision: 10, scale: 2}) // decimal ใช้แค่ค่าเงิน precision คือกี่ตน scaleคือจำนวนทศ
    price: number ;

    @Column()
    image_url: string ;

    @Column()
    description: string;

    @Column()
    hotels_hotel_id: number;

    @ManyToOne(() => Hotel, hotel => hotel.tours, { onDelete: 'CASCADE', cascade: false }) // OnDel ใช้เพื่อกันข้อมูลค้าง
    @JoinColumn({ name: 'hotels_hotel_id' })
    hotel: Hotel ;

    @OneToMany(() => Booking_tour, booking_tour => booking_tour.tour)
    booking_tours: Booking_tour[] ;
}