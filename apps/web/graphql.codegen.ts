import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../api/src/lib/graphql/schema/schema.gql',
  documents: ['./src/lib/graphql/queries/*.ts'],
  generates: {
    'src/lib/graphql/schema/operations.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          ID: "import('node:crypto').UUID",
          Date: 'Date',
          DateTime: 'Date',
        },
      },
    },
  },
};

export default config;
