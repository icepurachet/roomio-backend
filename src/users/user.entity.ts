import { Payment } from "src/payments/payment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User { 
    @PrimaryGeneratedColumn()
    user_id: number ;

    @Column()
    first_name: string ;

    @Column()
    last_name: string ;

    @Column()
    email: string ;

    @Column()
    phone_number: string ;

    @Column()
    special_request: string ;

    @OneToMany(() => Payment, payment => payment.user)
    payments: Payment[] ;
}