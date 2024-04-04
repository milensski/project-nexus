import { Controller, Post } from '@nestjs/common';
import { ProjectListingSeedService } from 'src/seed/seed';

@Controller('seed')
export class SeedController {
  constructor(private readonly projectListingSeedService: ProjectListingSeedService) {}

  @Post()
  async seedData(): Promise<string> {
    try {
      await this.projectListingSeedService.seed();
      return 'Data seeded successfully';
    } catch (error) {
      console.error('Seeding failed:', error);
      return 'Seeding failed';
    }
  }
}
