import { Type } from '@nestjs/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>): any {
  @ObjectType(`${classRef.name}Edge`)
  abstract class Edge {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [Edge])
    edges: Edge[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;
  }

  return PaginatedType;
}

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  startCursor: string;

  @Field(() => String, { nullable: true })
  endCursor: string;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class Institution {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;
}
