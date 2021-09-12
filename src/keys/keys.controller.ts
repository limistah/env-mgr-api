import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { KeysService } from './keys.service';
import { CreateKeyDto } from './dto/create-key.dto';
import { UpdateKeyDto } from './dto/update-key.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response } from 'express';

@Controller('keys')
export class KeysController {
  constructor(private readonly keysService: KeysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createKeyDto: CreateKeyDto, @Res() res: Response) {
    const dups = await this.keysService.find(createKeyDto);
    if (dups.length) {
      return res.status(400).json({
        message: 'Key already exists',
      });
    }
    const key = await this.keysService.create(createKeyDto);
    return res.status(201).json(key);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('project') projectId) {
    return this.keysService.findAll(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.keysService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
  //   return this.keysService.update(+id, updateKeyDto);
  // }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateKeyDto: UpdateKeyDto) {
    await this.keysService.update(+id, updateKeyDto);
    return this.keysService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.keysService.remove(+id);
  }
}
