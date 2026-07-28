import { Test, TestingModule } from '@nestjs/testing';
import { BookingToursController } from './booking_tours.controller';

describe('BookingToursController', () => {
  let controller: BookingToursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingToursController],
    }).compile();

    controller = module.get<BookingToursController>(BookingToursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
