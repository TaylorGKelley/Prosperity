import { type CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:7701/graphql",
  documents: ["./src/lib/graphql/queries/*.ts"],
  generates: {
    "src/lib/graphql/schema/operations.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        scalars: {
          ID: "import('node:crypto').UUID",
          Date: "Date",
          DateTime: "Date",
        },
      },
    },
  },
};

export default config;
