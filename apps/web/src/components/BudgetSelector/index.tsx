// import { GET_ALL_BUDGETS_QUERY } from '@/lib/graphql/queries/budget';
import BudgetSelectorClient from "./client";
import { createGraphClient } from "@/lib/graphql";
// import {
// 	type GetAllBudgetsQuery,
// 	type GetAllBudgetsQueryVariables,
// } from '@/lib/graphql/schema/operations';
import { cookies } from "next/headers";
import { type UUID } from "node:crypto";

export default async function BudgetSelector() {
  const cookieStore = await cookies();
  const selectedBudgetId = (await cookieStore.get("selectedBudgetId"))
    ?.value as UUID | undefined;

  // const graphClient = await createGraphClient();
  // const budgetQuery = graphClient.query<GetAllBudgetsQuery, GetAllBudgetsQueryVariables>({
  // 	query: GET_ALL_BUDGETS_QUERY,
  // });

  return (
    <BudgetSelectorClient
      // budgetQuery={}
      selectedBudgetId={selectedBudgetId}
    />
  );
}
