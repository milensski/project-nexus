import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectListingDto } from './dto/create-project-listing.dto';
import { UpdateProjectListingDto } from './dto/update-project-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectListing } from './entities/project-listing.entity';
import { In, Repository } from 'typeorm';
import { Technology } from 'src/technology/entities/technology.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectListingService {

  constructor(@InjectRepository(ProjectListing) private projectListingRepository: Repository<ProjectListing>,
    @InjectRepository(Technology) private technologyRepository: Repository<Technology>,
    @InjectRepository(User) private userRepository: Repository<User>) { }

  async create(createProjectListingDto: CreateProjectListingDto): Promise<ProjectListing> {
    const { ownerId, techStackNames, participantIds } = createProjectListingDto;

    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new NotFoundException(`User with ID ${ownerId} not found`);
    }

    let participants = await this.userRepository.find({ where: { id: In(participantIds) } });
    if (participants.length !== participantIds.length) {
      throw new NotFoundException('One or more participants not found');
    }

    const techStackPromises = techStackNames.map((techStackName) => this.technologyRepository.findOne({ where: { technologyName: techStackName } }));
    const techStack = await Promise.all(techStackPromises);
    if (techStack.length !== techStackNames.length) {
      throw new NotFoundException('One or more technologies not found');
    }

    const projectListing = this.projectListingRepository.create({
      ...createProjectListingDto,
      owner,
      participants,
      techStack,
    });

    return await this.projectListingRepository.save(projectListing);
  }
  async findAll() {
    return await this.projectListingRepository.find({relations: ['owner', 'participants']});
  }

  findOne(id: string) {
    return this.projectListingRepository.findOne({where: {id: id}, relations: ['owner', 'participants']});
  }

  update(id: string, updateProjectListingDto: UpdateProjectListingDto) {
    return `This action updates a #${id} projectListing`;
  }

  async joinProject(userId: string, projectId: string) {
    // Update project data to reflect user joining
    // (e.g., add user to project's participants list)

    let project = await this.findOne(projectId)
    const user = await this.userRepository.findOne({where: {id: userId}})

    project.participants.push(user);
    const result = await this.projectListingRepository.save(project);

    return result
  }

  remove(id: number) {
    return `This action removes a #${id} projectListing`;
  }
}
