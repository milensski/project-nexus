import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectListingDto } from './dto/create-project-listing.dto';
import { UpdateProjectListingDto } from './dto/update-project-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectListing } from './entities/project-listing.entity';
import { In, Repository } from 'typeorm';
import { Technology } from 'src/technology/entities/technology.entity';
import { User } from 'src/user/entities/user.entity';
import { log } from 'console';

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

    // Efficiently check for existing technologies using IN operator
    const existingTechnologies = await this.technologyRepository.find({
      where: { technologyName: In(techStackNames) },
    });

    // Filter missing technology names
    const missingTechnologies = techStackNames.filter(
      (techName) => !existingTechnologies.some((tech) => tech.technologyName === techName),
    );

    // Create missing technologies
    const createdTechnologies = await Promise.all(
      missingTechnologies.map((techName) => this.technologyRepository.create({ technologyName: techName })),
    );
    await this.technologyRepository.save(createdTechnologies); // Save created technologies

    // Combine existing and created technologies
    const allTechnologies = existingTechnologies.concat(createdTechnologies);

    console.log(allTechnologies);


    const projectListing = this.projectListingRepository.create({
      ...createProjectListingDto,
      owner,
      participants,
      techStack: allTechnologies,
    });

    return await this.projectListingRepository.save(projectListing);
  }
  async findAll() {
    return await this.projectListingRepository.find({ relations: ['owner', 'participants'] });
  }

  findOne(id: string) {
    return this.projectListingRepository.findOne({ where: { id: id }, relations: ['owner', 'participants'] });
  }

  findProjectsByUserId(id: string) {
    
    return this.projectListingRepository.find({
      where: { owner: { id } }, relations: ['owner', 'participants']
    }); 
  }

  update(id: string, updateProjectListingDto: UpdateProjectListingDto) {
    return `This action updates a #${id} projectListing`;
  }

  async joinProject(userId: string, projectId: string) {
    // Update project data to reflect user joining
    // (e.g., add user to project's participants list)

    let project = await this.findOne(projectId)
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    project.participants.push(user);
    const result = await this.projectListingRepository.save(project);

    return result
  }

  async leaveProject(userId: string, projectId: string) {
    // Update project data to reflect user leave
    // (e.g., remove user from project's participants list)

    let project = await this.findOne(projectId)
    const user = await this.userRepository.findOne({ where: { id: userId } })

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const index = project.participants.findIndex(participant => participant.id === user.id);

    if (index !== -1) {
      project.participants.splice(index, 1);
    } else {
      throw new NotFoundException(`User ${userId} is not a participant of project ${projectId}`);
    }

    // Update the project in the database
    const savedProject = await this.projectListingRepository.save(project);

    return savedProject;
  }

  remove(id: number) {
    return `This action removes a #${id} projectListing`;
  }
}
