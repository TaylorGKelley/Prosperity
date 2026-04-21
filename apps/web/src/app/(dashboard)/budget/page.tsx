import BudgetSelector from "@/components/BudgetSelector";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import LinkAccountForm from "@/components/forms/LinkAccountForm";
import MonthFilter from "@/components/month-filter";
import { Button } from "@/components/ui/button";
import CategoryIcon, {
  type CategoryColorKey,
  type CategoryIconKey,
} from "@/components/ui/category-icon";
import Navbar from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { createGraphClient } from "@/lib/graphql";
import { BUDGET_PAGE_QUERY } from "@/lib/graphql/queries/budget";
import {
  ColorEnum,
  IconEnum,
  type BudgetPageQuery,
  type BudgetPageQueryVariables,
} from "@/lib/graphql/schema/operations";
import Format from "@/utils/Format";
import { PiggyBankIcon, PlusIcon } from "lucide-react";
import { cookies } from "next/headers";
import { type UUID } from "node:crypto";
import CategoryDropdownMenu from "./components/CategoryDropdownMenu";

type BudgetPageProps = {
  params: Promise<{
    month?: string;
    year?: string;
  }>;
};

export default async function Budget({ params }: BudgetPageProps) {
  const { month, year } = await params;
  const selectedDate = new Date(
    year ? parseInt(year) : new Date().getFullYear(),
    month ? parseInt(month) - 1 : new Date().getMonth(),
    1,
  );
  const cookieStore = await cookies();
  const selectedBudgetId = cookieStore.get("selectedBudgetId")?.toString();

  // const graphClient = await createGraphClient();
  // const { data } = await graphClient.query<BudgetPageQuery, BudgetPageQueryVariables>({
  // 	query: BUDGET_PAGE_QUERY,
  // 	variables: {
  // 		monthDate: selectedDate,
  // 		budgetId: selectedBudgetId as UUID,
  // 	},
  // });

  const data = {
    categories: [
      {
        id: "",
        name: "",
        amount: 0,
        totalSpent: 0,
        icon: IconEnum.AlarmClock,
        color: ColorEnum.Amber,
      },
    ],
    savingGoals: [
      {
        id: "",
        title: "",
        targetAmount: 0,
        currentAmount: 0,
        icon: IconEnum.AlarmClock,
        color: ColorEnum.Amber,
        contributionAmount: 0,
      },
    ],
    banks: [
      {
        id: "",
        name: "",
        balance: 0,
        icon: IconEnum.AlarmClock,
        color: ColorEnum.Amber,
      },
    ],
    budgets: [
      {
        id: "aset",
        name: "",
        amount: 0,
        totalSpent: 0,
        icon: IconEnum.AlarmClock,
        color: ColorEnum.Amber,
      },
      {
        id: "",
        name: "",
        amount: 0,
        totalSpent: 0,
        icon: IconEnum.AlarmClock,
        color: ColorEnum.Amber,
      },
    ],
  };

  return (
    <div className="grid grid-cols-[auto_var(--container-sm)] bg-gray-100 min-h-screen">
      <div className="px-12">
        <Navbar />
        <main className="px-10 flex flex-col gap-6">
          <section className="flex justify-between items-center mb-4">
            {/*<BudgetSelector />*/}
            <MonthFilter />
          </section>

          {/* Categories Section */}
          <div className="flex items-center justify-between w-full">
            <p className="font-semibold text-xl">Categories</p>
            <div className="flex gap-8 items-center ">
              <p className="font-medium text-gray-500">Total Budget: $3500</p>
            </div>
          </div>
          {data.categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow flex gap-4 px-8 py-6"
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
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="font-semibold text-xl">{category.name}</p>
                  <div className="flex gap-6 items-center">
                    <p className="font-semibold text-right">
                      <span className="font-medium text-sm">
                        {Format.price(category.totalSpent)} /{" "}
                      </span>
                      <span>{Format.price(category.amount)}</span>
                    </p>
                    <CategoryDropdownMenu category={category} />
                  </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <p className="font-normal text-sm text-gray-500 text-nowrap">
                    {Math.floor((category.totalSpent / category.amount) * 100)}%
                    used
                  </p>
                  <div className="grid-cols-1 grid-rows-1 grid w-full rounded-full shadow-sm">
                    <div className="col-start-1 row-start-1 bg-green-100 h-1.5 rounded-full" />
                    <div
                      className={`col-start-1 row-start-1 bg-green-500 h-1.5 rounded-full`}
                      style={{
                        width: `${Math.floor((category.totalSpent / category.amount) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <CreateCategoryForm />

          {/* Saving Goals Section */}
          <div className="flex items-center w-full">
            <p className="font-semibold text-xl">Saving Goals</p>
          </div>
          {data.savingGoals.map((savingGoal) => (
            <div
              key={savingGoal.id}
              className="bg-white rounded-2xl shadow flex gap-4 px-8 py-6"
            >
              <CategoryIcon
                icon={
                  savingGoal.icon
                    .toLowerCase()
                    .replace("_", "-") as CategoryIconKey
                }
                color={
                  savingGoal.color
                    .toLowerCase()
                    .replace("_", "-") as CategoryColorKey
                }
              />
              <div className="flex flex-col gap-2 items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-2 items-center">
                    <p className="font-semibold text-xl">{savingGoal.title}</p>
                    <p className="font-medium text-xs text-gray-700">
                      Till
                      {" " +
                        Format.date(
                          new Date(
                            new Date().getFullYear(),
                            new Date().setMonth(
                              new Date().getMonth() +
                                (savingGoal.targetAmount -
                                  savingGoal.currentAmount) /
                                  savingGoal.contributionAmount,
                            ),
                            new Date().getDate(),
                          ),
                        ).dateDay}
                    </p>
                  </div>
                  <div className="flex gap-6 items-center">
                    <p className="font-semibold text-right">
                      <span className="font-medium text-xs text-gray-700">
                        {Format.price(savingGoal.currentAmount)} /{" "}
                      </span>
                      <span>{Format.price(savingGoal.targetAmount)}</span>
                    </p>
                    {/*<CategoryDropdownMenu category={{ id: savingGoal.id }} />*/}
                  </div>
                </div>
                <div className="flex gap-4 items-center w-full">
                  <p className="font-normal text-sm text-gray-500 text-nowrap">
                    {Format.price(savingGoal.contributionAmount)} / month
                  </p>
                  <div className="grid-cols-1 grid-rows-1 grid w-full rounded-full shadow-sm">
                    <div className="col-start-1 row-start-1 bg-blue-100 h-1.5 rounded-full" />
                    <div
                      className={`col-start-1 row-start-1 bg-blue-500 h-1.5 rounded-full`}
                      style={{
                        width: `${Math.floor(
                          (savingGoal.currentAmount / savingGoal.targetAmount) *
                            100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            className="flex gap-2 items-center justify-center px-4 py-3 w-full rounded-xl border bg-gray-100 hover:bg-gray-300/10 transition-colors cursor-pointer"
          >
            <PiggyBankIcon className="size-5" />
            <p className="font-normal">Add Savings Goal</p>
          </Button>
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
            {data.banks.map((account) => (
              <li key={account.id} className="flex gap-5 items-center">
                <CategoryIcon
                  icon="piggy-bank"
                  color={
                    account.color
                      .toLowerCase()
                      .replace("_", "-") as CategoryColorKey
                  }
                />
                <div>
                  <h4 className="text-xl font-semibold">{account.name}</h4>
                  <p>{Format.price(account.balance)}</p>
                </div>
              </li>
            ))}
            <li>
              <LinkAccountForm />
            </li>
          </ul>
        </section>
        <Separator className="bg-gray-400" />
        <section className="flex flex-col gap-9">
          <h3 className="text-2xl font-semibold">Budgets</h3>
          <ul className="flex flex-col gap-9">
            {data.budgets.map((budget) => (
              <li
                key={budget.id}
                className="grid grid-cols-[auto_1fr_auto] gap-5 items-center"
              >
                <CategoryIcon
                  icon={"wallet"}
                  color={
                    budget.color
                      .toLowerCase()
                      .replace("_", "-") as CategoryColorKey
                  }
                />
                <div>
                  <h4 className="text-xl font-semibold">{budget.name}</h4>
                  <p>{`${Format.price(3500)}/month`}</p>
                </div>
              </li>
            ))}
            <li>
              <Button
                variant="default"
                className="bg-amber-600 hover:bg-amber-700 w-full cursor-pointer text-amber-50"
              >
                <PlusIcon /> <span>Add Budget</span>
              </Button>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
}
