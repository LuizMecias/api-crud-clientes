import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DatabaseModule } from '../database/database.module';
import { clientsProviders } from './clients.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [...clientsProviders, ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
