import { DataSource } from 'typeorm';
import { Address } from './entities/address.entity';

export const addressesProviders = [
  {
    provide: 'ADDRESSES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Address),
    inject: ['DATA_SOURCE'],
  },
];
