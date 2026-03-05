import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { type Request, type Response } from 'express';
import { TransactionResolver } from './modules/transaction/transaction.resolver';
import { TransactionService } from './modules/transaction/transaction.service';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule, { DATABASE_CONNECTION } from './lib/db/database.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { BankClientModule } from './lib/bankClient/bankClient.module';
import { authSettings } from './lib/auth/auth';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        './src/lib/graphhql/schema/schema.gql',
      ),
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
        headers: req.headers,
      }),
    }),
    AuthModule.forRootAsync({
      imports: [DatabaseModule],
      useFactory: (db: NodePgDatabase) => {
        return {
          auth: betterAuth({
            ...authSettings,
            database: drizzleAdapter(db, {
              provider: 'pg',
            }),
          }),
        };
      },
      inject: [DATABASE_CONNECTION],
    }),
    DatabaseModule,
    BankClientModule,
  ],
  controllers: [HealthController],
  providers: [HealthService, TransactionResolver, TransactionService],
})
export class AppModule {}
