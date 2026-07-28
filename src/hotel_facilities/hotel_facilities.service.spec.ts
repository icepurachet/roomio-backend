import { Test, TestingModule } from '@nestjs/testing';
import { HotelFacilitiesService } from './hotel_facilities.service';

describe('HotelFacilitiesService', () => {
  let service: HotelFacilitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelFacilitiesService],
    }).compile();

    service = module.get<HotelFacilitiesService>(HotelFacilitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
