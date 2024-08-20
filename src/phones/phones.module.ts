import { Module } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesController } from './phones.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Phone } from './entities/phone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/clients/clients.module';
import { phonesProviders } from './phones.providers';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Phone]), ClientsModule],
  controllers: [PhonesController],
  providers: [...phonesProviders, PhonesService],
})
export class PhonesModule {}
