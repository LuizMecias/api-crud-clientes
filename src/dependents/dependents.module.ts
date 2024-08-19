import { Module } from '@nestjs/common';
import { DependentsService } from './dependents.service';
import { DependentsController } from './dependents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dependent } from './entities/dependent.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { DatabaseModule } from 'src/database/database.module';
import { dependentsProviders } from './dependents.providers';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Dependent]),
    ClientsModule,
  ],
  controllers: [DependentsController],
  providers: [...dependentsProviders, DependentsService],
})
export class DependentsModule {}
