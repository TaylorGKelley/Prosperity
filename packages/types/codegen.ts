import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3001/graphql', // /apps/api endpoint
  generates: {
    './index.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};
export default config;
