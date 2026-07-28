import { Test, TestingModule } from '@nestjs/testing';
import { BookingRoomsService } from './booking_rooms.service';

describe('BookingRoomsService', () => {
  let service: BookingRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingRoomsService],
    }).compile();

    service = module.get<BookingRoomsService>(BookingRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
