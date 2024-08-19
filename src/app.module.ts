import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { AddressesModule } from './addresses/addresses.module';
import { DependentsModule } from './dependents/dependents.module';
import { Client } from './clients/entities/client.entity';
import { Address } from './addresses/entities/address.entity';
import { Dependent } from './dependents/entities/dependent.entity';

@Module({
  imports: [
    ClientsModule,
    AddressesModule,
    DependentsModule,
    TypeOrmModule.forFeature([Client, Address, Dependent]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'clientes',
      entities: [Client, Address, Dependent],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
