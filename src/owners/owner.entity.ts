import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm' ;
import { Hotel } from 'src/hotels/hotel.entity';

@Entity('owners')
export class Owner {
    @PrimaryGeneratedColumn()
    owner_id: number ;

    @Column()
    username: string ;

    @Column()
    password: string ;

    @OneToMany(() => Hotel, hotel => hotel.owner)
    hotels: Hotel[] ;
}