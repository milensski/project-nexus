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

    // Create users
    const user1 = await this.userRepository.save({ username: 'spacecowboy', email: 'buzz@lightyear.com', password: hashedPassword});
    const user2 = await this.userRepository.save({ username: 'gadgetguru', email: 'inspectorgadget@who.com', password: hashedPassword });
    const user3 = await this.userRepository.save({ username: 'codewhisperer', email: 'trinity@matrix.net', password: hashedPassword });
    const user4 = await this.userRepository.save({ username: 'webdevwizard', email: 'wizard@webdev.com', password: hashedPassword });
    const user5 = await this.userRepository.save({ username: 'designmaestro', email: 'maestro@design.com', password: hashedPassword });
    const user6 = await this.userRepository.save({ username: 'thecodingninja', email: 'ninja@coding.com', password: hashedPassword });
    const user7 = await this.userRepository.save({ username: 'mobileappmaster', email: 'master@mobileapp.com', password: hashedPassword });
    const user8 = await this.userRepository.save({ username: 'devopsdynamo', email: 'dynamo@devops.com', password: hashedPassword });
    const user9 = await this.userRepository.save({ username: 'datasciencewhiz', email: 'whiz@datascience.com', password: hashedPassword });


    // Create projects
    const projects = [
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
      // Add more projects here
    ];

    // Save all project listings in one transaction for efficiency
    await this.projectListingRepository.save(projects);
  }
}