import { Test, TestingModule } from '@nestjs/testing';
import { HotelFullService } from './hotel_full.service';

describe('HotelFullService', () => {
  let service: HotelFullService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelFullService],
    }).compile();

    service = module.get<HotelFullService>(HotelFullService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
