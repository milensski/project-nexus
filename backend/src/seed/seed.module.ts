import { Module } from '@nestjs/common';
import { ProjectListingSeedService } from './seed';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProjectListing } from 'src/project-listing/entities/project-listing.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User,ProjectListing])],
    providers: [ProjectListingSeedService],
    exports: [],
    controllers: [SeedController],
  })
export class SeedModule {}
