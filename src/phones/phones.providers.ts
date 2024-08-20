import { DataSource } from 'typeorm';
import { Phone } from './entities/phone.entity';

export const phonesProviders = [
  {
    provide: 'PHONES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Phone),
    inject: ['DATA_SOURCE'],
  },
];
