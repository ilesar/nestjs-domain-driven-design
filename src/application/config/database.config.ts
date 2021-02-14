import { ConnectionOptions } from 'typeorm';

const databaseConfig: ConnectionOptions = {
  type: 'mariadb',
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [
    process.cwd() + '/infrastructure/database/entities/**/*.entity{.ts,.js}',
  ],
  synchronize: process.env.production !== 'true',
};

export = databaseConfig;
