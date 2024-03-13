import { Test, TestingModule } from '@nestjs/testing';
import { ProjectListingService } from './project-listing.service';

describe('ProjectListingService', () => {
  let service: ProjectListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectListingService],
    }).compile();

    service = module.get<ProjectListingService>(ProjectListingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
