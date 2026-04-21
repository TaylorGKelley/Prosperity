import { Type } from '@nestjs/common';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export function Paginated<T>(classRef: Type<T>) {
  // Create a concrete PageInfo object type named after the provided class.
  const pageInfoName = `${classRef.name}PageInfo`;
  @ObjectType(pageInfoName)
  class PageInfo {
    @Field(() => Int)
    length: number;

    @Field(() => Boolean)
    hasNextPage: boolean;

    // Cursor may be nullable for empty pages
    @Field(() => String, { nullable: true })
    endCursor?: string;
  }

  // Create a concrete Paginated object type named after the provided class.
  const paginatedName = `${classRef.name}Paginated`;
  @ObjectType(paginatedName)
  class PaginatedType {
    // Use the runtime class reference in the field type function so GraphQL can resolve the item type.
    @Field(() => [classRef])
    items: T[];

    @Field(() => PageInfo)
    pageInfo: PageInfo;
  }

  // Return the concrete class so Nest/GraphQL can discover the type at runtime.
  return PaginatedType as Type<any>;
}

@ObjectType()
export class Institution {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;
}
