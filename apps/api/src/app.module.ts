import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { type Request, type Response } from 'express';
import { TransactionResolver } from './modules/transaction/transaction.resolver';
import { TransactionService } from './modules/transaction/transaction.service';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { auth } from './lib/auth';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../../packages/types/schema.gql'),
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }), // Incase direct access is needed (like for better-auth usage or setting/reading cookies)
    }),

    AuthModule.forRoot({ auth }),
  ],
  controllers: [HealthController],
  providers: [HealthService, TransactionResolver, TransactionService],
})
export class AppModule {}
