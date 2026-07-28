import { Test, TestingModule } from '@nestjs/testing';
import { BookingToursService } from './booking_tours.service';

describe('BookingToursService', () => {
  let service: BookingToursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingToursService],
    }).compile();

    service = module.get<BookingToursService>(BookingToursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
