import { Module } from '@nestjs/common';
import { ProjectListingService } from './project-listing.service';
import { ProjectListingController } from './project-listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectListing } from './entities/project-listing.entity';
import { Technology } from 'src/technology/entities/technology.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectListing, Technology, User])],
  controllers: [ProjectListingController],
  providers: [ProjectListingService],
})
export class ProjectListingModule {}
