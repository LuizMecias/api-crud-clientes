import { DataSource } from 'typeorm';
import { Dependent } from './entities/dependent.entity';

export const dependentsProviders = [
  {
    provide: 'DEPENDENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dependent),
    inject: ['DATA_SOURCE'],
  },
];
