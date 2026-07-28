import { Test, TestingModule } from '@nestjs/testing';
import { HotelFacilitiesController } from './hotel_facilities.controller';

describe('HotelFacilitiesController', () => {
  let controller: HotelFacilitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelFacilitiesController],
    }).compile();

    controller = module.get<HotelFacilitiesController>(HotelFacilitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
