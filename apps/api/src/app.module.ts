import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { type Request, type Response } from 'express';
import { TransactionResolver } from './modules/transaction/transaction.resolver';
import { TransactionService } from './modules/transaction/transaction.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '../../packages/types/schema.gql'),
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }), // For Better-Auth session access
    }),
  ],
  providers: [TransactionResolver, TransactionService],
})
export class AppModule {}
