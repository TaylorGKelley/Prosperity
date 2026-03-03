import { createGraphClient } from "@/lib/graphql";
import { GET_TRANSACTIONS_WITH_PAGINATION } from "@/lib/graphql/queries/transactions";
import {
  TransactionStatusEnum,
  type GetTransactionsWithPaginationQuery,
  type GetTransactionsWithPaginationQueryVariables,
} from "@/lib/graphql/schema/operations";

import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import {
  Breadcrumb,
  BreadcrumbItem,
  // BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  // BreadcrumbSeparator,
} from "@repo/ui/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/card";

import { Separator } from "@repo/ui/separator";
import { SidebarTrigger } from "@repo/ui/sidebar";
import RefreshTransactionsButton from "@/components/forms/RefreshTransactionsButton";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { Button } from "@repo/ui/button";

export default async function Home() {
  const graphClient = await createGraphClient();
  const { data } = await graphClient.query<
    GetTransactionsWithPaginationQuery,
    GetTransactionsWithPaginationQueryVariables
  >({
    query: GET_TRANSACTIONS_WITH_PAGINATION,
    variables: {
      monthDate: new Date(),
      pagination: {
        count: 5,
      },
    },
  });

  const chartData = [
    { month: "Jun", balance: 120 },
    { month: "Jul", balance: 80 },
    { month: "Aug", balance: 200 },
  ];

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block' /> */}
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card className="hover:scale-x-[100.5%] hover:scale-y-[101%] transition-transform duration-150 ease-in-out">
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button></Button>
            <div>
              <RefreshTransactionsButton />
              <Link href="/transactions">See All</Link>
            </div>
            <div className="grid">
              {data?.transactions.items.map((transaction, i) => (
                <div
                  key={transaction.id}
                  className={cn({
                    "border-t": i > 0,
                  })}
                >
                  <div className="flex gap-4 items-center p-4 hover:bg-gray-50/50 transition-colors duration-150 ease-in-out rounded-md relative">
                    <p>{transaction.description}</p>
                    <p
                      className={cn("text-sm py-0.5 px-4", {
                        "bg-green-100":
                          transaction.status === TransactionStatusEnum.Posted,
                        "bg-yellow-100":
                          transaction.status === TransactionStatusEnum.Pending,
                      })}
                    >
                      {transaction.status[0] +
                        transaction.status.toLowerCase().substring(1)}
                    </p>
                    <p className="font-semibold font-mono">
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
          <Card className="hover:scale-[101%] transition-transform duration-150 ease-in-out">
            <CardHeader>
              <CardTitle>Remaining funds</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="">$500.00</h3>
              <LineChart
                data={chartData}
                config={{
                  balance: {
                    label: "Balance",
                    color: "var(--chart-1)",
                  },
                }}
                YDataKey={"balance"}
                XDataKey={"month"}
              />
            </CardContent>
          </Card>
          <Card className="hover:scale-[101%] transition-transform duration-150 ease-in-out">
            <CardHeader>
              <CardTitle>Spending</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="">$500.00</h3>
              <BarChart
                data={chartData}
                config={{
                  balance: {
                    label: "Balance",
                    color: "var(--chart-1)",
                  },
                }}
                YDataKey={"balance"}
                XDataKey={"month"}
              />
            </CardContent>
          </Card>
          <Card className="hover:scale-[101%] transition-transform duration-150 ease-in-out">
            <CardHeader>
              <CardTitle>Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="">$500.00</h3>
              <LineChart
                data={chartData}
                config={{
                  balance: {
                    label: "Balance",
                    color: "var(--chart-1)",
                  },
                }}
                YDataKey={"balance"}
                XDataKey={"month"}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
