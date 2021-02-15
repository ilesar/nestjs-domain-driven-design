import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DATABASE_HOST);
const databaseConfig: ConnectionOptions = {
  type: 'mariadb',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: parseInt(process.env.DATABASE_PORT, 10),
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: [
    __dirname + '/../../infrastructure/database/entities/**/*.entity{.ts,.js}',
  ],
  synchronize: process.env.production !== 'true',
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [
    __dirname + '/../../infrastructure/database/migrations/*{.ts,.js}',
  ],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  charset: 'utf8mb4_unicode_ci',
};

export = databaseConfig;
