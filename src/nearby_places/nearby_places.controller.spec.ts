import { Test, TestingModule } from '@nestjs/testing';
import { NearbyPlacesController } from './nearby_places.controller';

describe('NearbyPlacesController', () => {
  let controller: NearbyPlacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NearbyPlacesController],
    }).compile();

    controller = module.get<NearbyPlacesController>(NearbyPlacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
