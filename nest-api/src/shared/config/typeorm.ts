import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { Documents } from "../../modules/infrastructure/entities/documents.entity";
import { Users } from "../../modules/infrastructure/entities/users.entity";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASS}`,
    database: `${process.env.DB_NAME}`,
    entities: [Users, Documents],
    migrations: [__dirname + '/migrations/*.{js,ts}'],
    autoLoadEntities: true,
    synchronize: false,
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions);