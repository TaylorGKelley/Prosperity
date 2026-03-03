import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as authSchema from '../auth/schema';
import * as appSchema from './schema/schema';

export const DATABASE_CONNECTION = Symbol.for('DATABASE_CONNECTION');
const schema = {
  ...authSchema,
  ...appSchema,
};

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
        });

        return drizzle(pool, {
          schema,
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export default class DatabaseModule {}

export type DatabaseClient = NodePgDatabase<typeof schema>;
