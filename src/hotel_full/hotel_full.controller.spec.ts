import { Test, TestingModule } from '@nestjs/testing';
import { HotelFullController } from './hotel_full.controller';

describe('HotelFullController', () => {
  let controller: HotelFullController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelFullController],
    }).compile();

    controller = module.get<HotelFullController>(HotelFullController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
