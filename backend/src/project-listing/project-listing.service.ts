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


    const projectListing = this.projectListingRepository.create({
      ...createProjectListingDto,
      owner,
      participants,
      techStack: allTechnologies,
    });

    return await this.projectListingRepository.save(projectListing);
  }
  async findAll() {
    return await this.projectListingRepository.find({ relations: ['owner', 'participants', 'techStack'] });
  }

  findOne(id: string) {
    return this.projectListingRepository.findOne({ where: { id: id }, relations: ['owner', 'participants', 'techStack'] });
  }

  findProjectsByUserId(id: string) {
    
    return this.projectListingRepository.find({
      where: { owner: { id } }, relations: ['owner', 'participants', 'techStack']
    }); 
  }

  async update(id: string, updateProjectListingDto: UpdateProjectListingDto): Promise<ProjectListing> {
    const projectListing = await this.findOne(id)

    if (!projectListing) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Update project listing fields based on the provided DTO
    if (updateProjectListingDto.title) {
      projectListing.title = updateProjectListingDto.title;
    }

    if (updateProjectListingDto.description) {
      projectListing.description = updateProjectListingDto.description;
    }

    if (updateProjectListingDto.category) {
      projectListing.category = updateProjectListingDto.category;
    }

    if (updateProjectListingDto.techStackNames) {
      const existingTechnologies = await this.technologyRepository.find({
        where: { technologyName: In(updateProjectListingDto.techStackNames) },
      });

      // Filter missing technology names
      const missingTechnologies = updateProjectListingDto.techStackNames.filter(
        (techName) => !existingTechnologies.some((tech) => tech.technologyName === techName),
      );

      // Create missing technologies
      const createdTechnologies = await Promise.all(
        missingTechnologies.map((techName) => this.technologyRepository.create({ technologyName: techName })),
      );
      await this.technologyRepository.save(createdTechnologies); // Save created technologies

      // Combine existing and created technologies
      const allTechnologies = existingTechnologies.concat(createdTechnologies);
      projectListing.techStack = allTechnologies;
    }

    // Save the updated project listing
    return await this.projectListingRepository.save(projectListing);
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

  async remove(id: string): Promise<void> {
    // Find the project listing by ID
    const projectListing = await this.findOne(id);

    // If project listing not found, throw NotFoundException
    if (!projectListing) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Remove the project listing
    await this.projectListingRepository.remove(projectListing);
  }


  async getUserProjectCountByCategory(userId: string): Promise<{ [category: string]: number }> {
    const projects = await this.projectListingRepository.find({
      where: { owner: { id: userId } },
    });

    const projectCountByCategory: { [category: string]: number } = {};

    projects.forEach(project => {
      if (project.category in projectCountByCategory) {
        projectCountByCategory[project.category]++;
      } else {
        projectCountByCategory[project.category] = 1;
      }
    });

    return projectCountByCategory;
  }

  async getUserProjectCount(userId: string): Promise<number> {
    return this.projectListingRepository.count({ where: { owner: {id: userId} } });
  }

  async getAllParticipants(userId: string): Promise<User[]> {
    // Find all projects of the user
    const projects = await this.projectListingRepository.find({
      where: { owner: { id: userId } },
      relations: ['participants'],
    });

    // Extract participants from each project and add projects to participants
    const participantsMap = new Map<string, User>();
    projects.forEach((project) => {
      project.participants.forEach((participant) => {
        if (!participantsMap.has(participant.id)) {
          // Initialize the participant with an empty projects array
          participantsMap.set(participant.id, { ...participant, projects: [] });
        }
        // Add the project to the participant's projects array
        participantsMap.get(participant.id).projects.push(project);
      });
    });

    // Convert map values to an array and return
    return Array.from(participantsMap.values());
  }

}
