import CategoryIcon, {
  type CategoryColorKey,
  type CategoryIconKey,
} from "@/components/ui/category-icon";
import Navbar from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Format from "@/utils/Format";
import MonthFilter from "@/components/month-filter";
import { createGraphClient } from "@/lib/graphql";
import { TRANSACTION_PAGE_QUERY } from "@/lib/graphql/queries/transactions";
import {
  TransactionStatusEnum,
  type TransactionPageQuery,
  type TransactionPageQueryVariables,
} from "@/lib/graphql/schema/operations";
import { cookies } from "next/headers";
import { type UUID } from "node:crypto";
import TransactionList from "./components/TransactionList";
import TransactionCard from "./components/TransactionCard";
import BudgetSelector from "@/components/BudgetSelector";
import { Suspense } from "react";

export type TransactionsPageProps = {
  params: Promise<{
    month?: string;
    year?: string;
  }>;
};

export default async function Transactions({ params }: TransactionsPageProps) {
  // Query Params
  const { month, year } = await params;
  const selectedDate = new Date(
    year ? parseInt(year) : new Date().getFullYear(),
    month ? parseInt(month) - 1 : new Date().getMonth(),
    1,
  );
  // Cookies
  const cookieStore = await cookies();
  const selectedBudgetId = cookieStore.get("selectedBudgetId")?.toString();

  // Sync transactions once upon page load
  // await syncTransactions();

  const graphClient = await createGraphClient();
  const { data } = await graphClient.query<
    TransactionPageQuery,
    TransactionPageQueryVariables
  >({
    query: TRANSACTION_PAGE_QUERY,
    variables: {
      monthDate: selectedDate,
      budgetId: selectedBudgetId as UUID | "",
    },
  });

  const query = graphClient.query<
    TransactionPageQuery,
    TransactionPageQueryVariables
  >({
    query: TRANSACTION_PAGE_QUERY,
    variables: {
      monthDate: selectedDate,
      budgetId: selectedBudgetId as UUID | "",
    },
  });

  return (
    <div className="grid grid-cols-[auto_var(--container-sm)] bg-gray-100 min-h-screen">
      <div className="px-12">
        <Navbar />
        <main className="px-10 flex flex-col gap-6 pb-12">
          <section className="flex justify-between items-center mb-4">
            <BudgetSelector />
            <MonthFilter />
          </section>

          <section className="flex flex-col gap-8 w-full ">
            <Suspense
              fallback={
                <>
                  <p>Loading Transactions...</p>
                </>
              }
            >
              <TransactionList
                transactionsQuery={query.then(({ data }) => data!.transactions)}
              />
            </Suspense>
            {/* Pending Heading */}
            <div className="flex items-center justify-between overflow-clip relative shrink-0 w-full">
              <p className="font-semibold text-xl">Pending</p>
              <div className="flex font-medium gap-8 items-center text-gray-500">
                <p>Number of transactions: {data!.transactions.items.length}</p>
                <p>
                  Value:&nbsp;
                  {Format.price(
                    data!.transactions.items.reduce((acc, transaction) => {
                      return transaction.amount + acc;
                    }, 0),
                  )}
                </p>
              </div>
            </div>

            {data!.transactions.items
              .filter(
                (transaction) =>
                  transaction.status === TransactionStatusEnum.Pending,
              )
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            {/* Posted Section */}
            <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-full">
              <p className="font-semibold leading-[28px] not-italic relative shrink-0 text-[20px] text-black text-nowrap whitespace-pre">
                {Format.date(selectedDate).dateMonth}
              </p>
            </div>

            {data!.transactions.items
              .filter(
                (transaction) =>
                  transaction.status === TransactionStatusEnum.Posted,
              )
              .map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
          </section>
        </main>
      </div>
      <aside className="flex flex-col gap-18 bg-white p-12">
        <section className="flex justify-end">
          <div className="w-12 h-12 rounded-lg shadow bg-gray-500">
            {/* Profile Photo */}
          </div>
        </section>
        <section className="flex flex-col gap-9">
          <h3 className="text-2xl font-semibold">Accounts</h3>
          <ul className="flex flex-col gap-9">
            {data!.accounts.map((account) => (
              <li key={account.id} className="flex gap-5 items-center">
                <CategoryIcon
                  icon={"wallet"}
                  color={
                    account.color
                      .toLowerCase()
                      .replace("_", "-") as CategoryColorKey
                  }
                />
                <div>
                  <h4 className="text-xl font-semibold">{account.name}</h4>
                  {/* <p>{Format.price(account.balance)}</p> */}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <Separator className="bg-gray-400" />
        <section className="flex flex-col gap-9">
          <h3 className="text-2xl font-semibold">Categories</h3>
          <ul className="flex flex-col gap-9">
            {data!.categories.map((category) => (
              <li
                key={category.id}
                className="grid grid-cols-[auto_1fr_auto] gap-5 items-center"
              >
                <CategoryIcon
                  icon={
                    category.icon
                      .toLowerCase()
                      .replace("_", "-") as CategoryIconKey
                  }
                  color={
                    category.color
                      .toLowerCase()
                      .replace("_", "-") as CategoryColorKey
                  }
                />
                <div>
                  <h4 className="text-xl font-semibold">{category.name}</h4>
                  <p>{Format.price(category.amount)}</p>
                </div>
                <p
                  className={cn(
                    "text-sm bg-gray-100 px-1.5 py-0.75 rounded-md",
                    {
                      "bg-red-100 text-red-500":
                        category.amount - category.totalSpent < 0,
                    },
                  )}
                >
                  {Format.price(category.amount - category.totalSpent)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
