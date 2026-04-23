import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../../apps/api/src/lib/graphql/schema/schema.gql',
  generates: {
    './src/generated/graphql.ts': {
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
