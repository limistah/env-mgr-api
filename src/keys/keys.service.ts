import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { Keys } from './entities/key.entity';

@Injectable()
export class KeysService {
  constructor(
    @InjectRepository(Keys)
    private keysRepository: Repository<Keys>,
  ) {}

  create(createKeyDto: CreateKeyDto) {
    const key = new Keys();
    key.name = createKeyDto.name;
    key.value = createKeyDto.value;
    key.project_id = createKeyDto.project_id;
    key.org_id = createKeyDto.org_id;
    return this.keysRepository.save(key);
  }

  findAll(project_id: string) {
    return this.keysRepository.find({ where: { project_id } });
  }

  find(query): Promise<Keys[]> {
    return this.keysRepository.find({ where: query });
  }

  findOne(id: number) {
    return this.keysRepository.findOne({ where: { id } });
  }

  update(id: number, updateKeyDto: UpdateKeyDto) {
    return this.keysRepository.update(id, updateKeyDto);
  }

  remove(id: number) {
    return this.keysRepository.delete(id);
  }
}
