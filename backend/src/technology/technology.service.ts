import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { Technology } from './entities/technology.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TechnologyService {

  constructor(
    @InjectRepository(Technology)
    private readonly technologyRepository: Repository<Technology>,
  ) { }


  async create(technologyData: Partial<Technology>): Promise<Technology> {
    const technology = this.technologyRepository.create(technologyData);
    return this.technologyRepository.save(technology);
  }

  async findAll(): Promise<Technology[]> {
    return this.technologyRepository.find({select: {technologyName: true}});
  }

  async findOne(id: Technology['id']): Promise<Technology> {
    const technology = await this.technologyRepository.findOne({ where: { id } })

    if (!technology){
      throw new NotFoundException(`Technology with ID ${id} not found`);

    }

    return technology
  }

  async update(id: Technology['id'], technologyData: Partial<Technology>): Promise<Technology> {
    const technology = await this.technologyRepository.findOne({ where: { id } });
    if (!technology) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }

    Object.assign(technology, technologyData);

    return this.technologyRepository.save(technology);
  }


  async remove(id: Technology['id']): Promise < void> {
    const technology = await this.technologyRepository.findOne({ where: { id } });
    if (!technology) {
      throw new NotFoundException(`Technology with ID ${id} not found`);
    }

    await this.technologyRepository.delete(id);
}

}
