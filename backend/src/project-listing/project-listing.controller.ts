import { Controller, Get, Post, Body, Param, Delete, UseGuards, NotFoundException, Put, Query } from '@nestjs/common';
import { ProjectListingService } from './project-listing.service';
import { CreateProjectListingDto } from './dto/create-project-listing.dto';
import { UpdateProjectListingDto } from './dto/update-project-listing.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ListUserProjectsDto } from './dto/list-user-projects.dto';
import { User } from 'src/user/entities/user.entity';

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

  @Post('list')
  async findProjects(@Body() user: ListUserProjectsDto) {
    
    return await this.projectListingService.findProjectsByUserId(user.userId);
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    try {
      return await this.projectListingService.findOne(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return undefined; // Or return a custom error response object
      } else {
        throw error; // Re-throw other errors for NestJS handling
      }
    }
  }



  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProjectListingDto: UpdateProjectListingDto) {
    return this.projectListingService.update(id, updateProjectListingDto);
  }

  @Post(':id/join')
  @UseGuards(JwtAuthGuard)
  async join(@Param('id') projectId: string, @Body() participant) {
    const userId = participant.user.id

    const result = await this.projectListingService.joinProject(userId, projectId)

    return result
  }

  @Post(':id/leave')
  @UseGuards(JwtAuthGuard)
  async leave(@Param('id') projectId: string, @Body() participant) {
    const userId = participant.user.id
    const result = await this.projectListingService.leaveProject(userId, projectId)

    return result
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.projectListingService.remove(id);
  }

  @Get('manage/:userId/countBy-category')
  async getUserProjectCountByCategory(
    @Param('userId') userId: string,
    
  ) {
    return this.projectListingService.getUserProjectCountByCategory(userId);
  }

  @Get('manage/:userId/count')
  async getUserProjectCount(@Param('userId') userId: string) {
    const totalCount = await this.projectListingService.getUserProjectCount(userId)
    return {totalCount};
  }

  @Get('manage/:userId/participants')
  async getAllParticipants(@Param('userId') userId: string): Promise<User[]> {
    return this.projectListingService.getAllParticipants(userId);
  }

}
