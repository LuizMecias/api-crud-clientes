import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { addressesProviders } from './addresses.providers';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Address]), ClientsModule],
  controllers: [AddressesController],
  providers: [...addressesProviders, AddressesService],
})
export class AddressesModule {}
