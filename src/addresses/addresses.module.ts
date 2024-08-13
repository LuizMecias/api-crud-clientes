import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { ClientesModule } from 'src/clientes/clientes.module';
import { addressesProviders } from './addresses.providers';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Address]),
    ClientesModule,
  ],
  controllers: [AddressesController],
  providers: [...addressesProviders, AddressesService],
})
export class AddressesModule {}
