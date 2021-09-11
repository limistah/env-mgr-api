import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Projects } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Projects();
    project.name = createProjectDto.name;
    project.org_id = createProjectDto.org_id;
    return this.projectsRepository.save(project);
  }

  find(query): Promise<Projects[]> {
    return this.projectsRepository.find({ where: query });
  }

  findAll(org_id: string) {
    return this.projectsRepository.find({ where: { org_id } });
  }

  findOne(id: number) {
    return this.projectsRepository.findOne({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}
