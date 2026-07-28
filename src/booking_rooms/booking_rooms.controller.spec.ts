import { Test, TestingModule } from '@nestjs/testing';
import { BookingRoomsController } from './booking_rooms.controller';

describe('BookingRoomsController', () => {
  let controller: BookingRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingRoomsController],
    }).compile();

    controller = module.get<BookingRoomsController>(BookingRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
