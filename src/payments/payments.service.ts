import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
        const user = await this.userRepository.findOne({ where: { user_id: createPaymentDto.users_user_id } });
        if (!user) {
            throw new NotFoundException(`User with id ${createPaymentDto.users_user_id} not found`);
        }

        const payment = this.paymentRepository.create({
            payment_type: createPaymentDto.payment_type,
            amount: createPaymentDto.amount,
            user: user,
        });

        return this.paymentRepository.save(payment);
    }

    findAll(): Promise<Payment[]> {
        return this.paymentRepository.find({ relations: ['user'] });
    }

    async findOne(id: number): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { payment_id: id },
            relations: ['user'],
        });
        if (!payment) {
            throw new NotFoundException(`Payment with id ${id} not found`);
        }
        return payment;
    }

    async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
        let user;
        if (updatePaymentDto.users_user_id) {
            user = await this.userRepository.findOne({ where: { user_id: updatePaymentDto.users_user_id } });
            if (!user) {
                throw new NotFoundException(`User with id ${updatePaymentDto.users_user_id} not found`);
            }
        }

        const payment = await this.paymentRepository.findOne({ where: { payment_id: id } });
        if (!payment) {
            throw new NotFoundException(`Payment with id ${id} not found`);
        }

        if (updatePaymentDto.payment_type !== undefined) {
            payment.payment_type = updatePaymentDto.payment_type;
        }
        if (updatePaymentDto.amount !== undefined) {
            payment.amount = updatePaymentDto.amount;
        }
        if (user) {
            payment.user = user;
        }

        return this.paymentRepository.save(payment);
    }

    async remove(id: number): Promise<void> {
        const result = await this.paymentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Payment with id ${id} not found`);
        }
    }
}
