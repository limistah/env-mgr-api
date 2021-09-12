import { Module } from '@nestjs/common';
import { KeysService } from './keys.service';
import { KeysController } from './keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keys } from './entities/key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keys])],
  controllers: [KeysController],
  providers: [KeysService],
})
export class KeysModule {}
