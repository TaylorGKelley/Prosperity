"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import CategoryIcon from "../ui/category-icon";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Cookies from "@/utils/Cookies";
import { useRouter } from "next/navigation";
// import { type GetAllBudgetsQuery } from '@/lib/graphql/schema/operations';
import { type ApolloQueryResult } from "@apollo/client";
import { use, useLayoutEffect } from "react";
import { type UUID } from "node:crypto";

type BudgetSelectorClientProps = {
  // budgetQuery: Promise<ApolloQueryResult<GetAllBudgetsQuery>>;
  selectedBudgetId: UUID | undefined;
};

export default function BudgetSelectorClient({
  // budgetQuery,
  selectedBudgetId,
}: BudgetSelectorClientProps) {
  const router = useRouter();
  // const {
  //   data: { budgets },
  // } = use(budgetQuery);

  const { budgets } = {
    budgets: [
      {
        id: "",
        isDefault: false,
      },
    ],
  };

  useLayoutEffect(() => {
    Cookies.set(
      "selectedBudget",
      selectedBudgetId || budgets.findLast((budget) => budget.isDefault)!.id,
    );
  });

  return (
    <div className="flex gap-6">
      <CategoryIcon icon="wallet" color="amber" className="size-14" />
      <div>
        <Popover>
          <PopoverTrigger className="cursor-pointer">
            <h2 className="text-2xl font-bold inline-flex items-center gap-2">
              <span>Home Budget</span>
              <ChevronsUpDownIcon className="size-5" />
            </h2>
          </PopoverTrigger>
          <PopoverContent className="rounded-2xl">
            <h5 className="text-lg font-semibold mb-2 ml-2">Change Budget</h5>
            <Separator />
            <ul className="grid gap-2 py-2">
              {budgets.map((budget) => (
                <li key={budget.id}>
                  <Button
                    variant="ghost"
                    className="w-full h-min flex justify-start gap-4 cursor-pointer p-2"
                    onClick={() => {
                      Cookies.set("selectedBudget", budget.id);
                      router.refresh();
                    }}
                  >
                    <CategoryIcon icon="wallet" color="amber" />
                    <span className="text-lg grow text-left">Home</span>
                    {selectedBudgetId === budget.id || budget.isDefault ? (
                      <CheckIcon />
                    ) : undefined}
                  </Button>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
        <p className="text-gray-500">Change default budget</p>
      </div>
    </div>
  );
}
