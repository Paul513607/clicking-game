import { DataSource } from 'typeorm';
import { User } from '../models/User';

export class AppDataSource {
  private static instance: DataSource;

  private constructor() {
  }

  public static getInstance(): DataSource {
    if (!AppDataSource.instance) {
      AppDataSource.instance = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'clicking-game-db',
        entities: [
          User
        ],
        synchronize: true,
        logging: false
      });
    }

    return AppDataSource.instance;
  }
}
