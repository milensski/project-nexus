import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectListingService } from './project-listing.service';
import { CreateProjectListingDto } from './dto/create-project-listing.dto';
import { UpdateProjectListingDto } from './dto/update-project-listing.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('project')
export class ProjectListingController {
  constructor(private readonly projectListingService: ProjectListingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProjectListingDto: CreateProjectListingDto) {

    return this.projectListingService.create(createProjectListingDto);
  }

  @Get()
  findAll() {
    return this.projectListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectListingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectListingDto: UpdateProjectListingDto) {
    return this.projectListingService.update(+id, updateProjectListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectListingService.remove(+id);
  }
}
