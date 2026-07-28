import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from 'src/rooms/room.entity'

@Entity('room_features')
export class Room_feature{
    @PrimaryGeneratedColumn()
    feature_id: number ;

    @Column()
    name: string;

    @Column()
    icon_url: string;

    @ManyToOne(() => Room, room => room.room_features)
    @JoinColumn({ name: 'rooms_room_id'})
    room: Room ;
}