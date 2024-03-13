import { Test, TestingModule } from '@nestjs/testing';
import { ProjectListingController } from './project-listing.controller';
import { ProjectListingService } from './project-listing.service';

describe('ProjectListingController', () => {
  let controller: ProjectListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectListingController],
      providers: [ProjectListingService],
    }).compile();

    controller = module.get<ProjectListingController>(ProjectListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
