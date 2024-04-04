import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectListing } from 'src/project-listing/entities/project-listing.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProjectListingSeedService {
  constructor(
    @InjectRepository(ProjectListing)
    private projectListingRepository: Repository<ProjectListing>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed() {
    const hashedPassword = await bcrypt.hash('123', 10);

    // Create users if they don't exist
    const user1 = await this.findOrCreateUser('spacecowboy', 'buzz@lightyear.com', hashedPassword);
    const user2 = await this.findOrCreateUser('gadgetguru', 'inspectorgadget@who.com', hashedPassword);
    const user3 = await this.findOrCreateUser('codewhisperer', 'trinity@matrix.net', hashedPassword);
    const user4 = await this.findOrCreateUser('webdevwizard', 'wizard@webdev.com', hashedPassword);
    const user5 = await this.findOrCreateUser('designmaestro', 'maestro@design.com', hashedPassword);
    const user6 = await this.findOrCreateUser('thecodingninja', 'ninja@coding.com', hashedPassword);
    const user7 = await this.findOrCreateUser('mobileappmaster', 'master@mobileapp.com', hashedPassword);
    const user8 = await this.findOrCreateUser('devopsdynamo', 'dynamo@devops.com', hashedPassword);
    const user9 = await this.findOrCreateUser('datasciencewhiz', 'whiz@datascience.com', hashedPassword);
    const user10 = await this.findOrCreateUser('milen_palachorov', 'mpa@project-nexus.com', hashedPassword);

    // Check if projects already exist
    const existingProjects = await this.projectListingRepository.find();

    // Create projects if they don't exist
    const projectsToCreate = [
      {
        title: 'Galactic Getaway App',
        description: 'A mobile app for booking travel to space destinations.',
        category: 'Full-stack',
        owner: user1,
        participants: [user2, user3],
        techStackNames: ['React', 'Node.js'],
      },
      {
        title: 'Smart Home Automation System',
        description: 'Control your lights, thermostats, and appliances from your phone.',
        category: 'Backend',
        owner: user2,
        participants: [user3, user4],
        techStackNames: ['Node.js', 'Python'],
      },
      {
        title: 'AI-powered Stock Trading Platform',
        description: 'An intelligent platform for automated and data-driven stock trading.',
        category: 'Backend',
        owner: user3,
        participants: [user1, user4, user5],
        techStackNames: ['Python', 'TensorFlow'],
      },
      {
        title: 'E-commerce Website Redesign',
        description: 'Revamping an existing e-commerce website for better user experience.',
        category: 'Frontend',
        owner: user4,
        participants: [user1, user3, user6],
        techStackNames: ['React', 'CSS'],
      },
      {
        title: 'Online Portfolio Showcase',
        description: 'Creating a portfolio website to showcase design and development projects.',
        category: 'Frontend',
        owner: user5,
        participants: [user2, user4, user7],
        techStackNames: ['Vue.js', 'HTML', 'CSS'],
      },
      {
        title: 'Mobile App Development',
        description: 'Building a cross-platform mobile app for iOS and Android.',
        category: 'Frontend',
        owner: user6,
        participants: [user4, user7, user8],
        techStackNames: ['React Native', 'Firebase'],
      },
      {
        title: 'DevOps Automation Project',
        description: 'Implementing CI/CD pipelines and infrastructure as code for seamless deployments.',
        category: 'Backend',
        owner: user7,
        participants: [user5, user8, user9],
        techStackNames: ['Jenkins', 'Docker', 'Kubernetes'],
      },
      {
        title: 'Virtual Reality Fitness App',
        description: 'An immersive fitness experience that combines virtual reality technology with workout routines to make exercising more engaging and enjoyable.',
        category: 'Full-stack',
        owner: user10,
        participants: [user1, user3, user6],
        techStackNames: ['React', 'Node.js', 'Unity'],
      },
      {
        title: 'Community Recipe Sharing Platform',
        description: 'A platform where users can discover, share, and collaborate on recipes with others in the community. From family favorites to experimental creations, everyone can find inspiration here.',
        category: 'Frontend',
        owner: user10,
        participants: [user2, user4, user8],
        techStackNames: ['Vue.js', 'HTML', 'CSS'],
      },
      {
        title: 'Smart Gardening Assistant',
        description: 'Take your gardening skills to the next level with a smart assistant that helps you monitor plant health, optimize watering schedules, and receive personalized tips for nurturing your garden.',
        category: 'Backend',
        owner: user10,
        participants: [user5, user7, user9],
        techStackNames: ['Python', 'Django', 'MongoDB'],
      },
      // Add more projects here
    ];

    const projectPromises = projectsToCreate.map(async projectData => {
      const existingProject = existingProjects.find(project => project.title === projectData.title);
      if (!existingProject) {
        const newProject = this.projectListingRepository.create(projectData);
        await this.projectListingRepository.save(newProject);
      }
    });

    await Promise.all(projectPromises);
  }

  async findOrCreateUser(username: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return existingUser;
    } else {
      return this.userRepository.save({ username, email, password });
    }
  }
}