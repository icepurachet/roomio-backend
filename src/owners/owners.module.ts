import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';

@Module({
  providers: [OwnersService],
  exports: [OwnersService],
  controllers: [OwnersController],
  imports: [TypeOrmModule.forFeature([Owner])]
})
export class OwnersModule {}
