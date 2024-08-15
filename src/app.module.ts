import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clientes/clients.module';
import { AddressesModule } from './addresses/addresses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clientes/entities/client.entity';
import { Address } from './addresses/entities/address.entity';

@Module({
  imports: [
    ClientsModule,
    AddressesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'clientes',
      entities: [Client, Address],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
