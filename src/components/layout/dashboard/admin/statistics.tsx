"use client";

import { ClipboardList, Clock, CheckCircle2, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


import { useGetSubmissionStatistics } from "@/hooks";
import { Button } from "@/components/ui/button";

export default function Statistics() {
  const { data, isPending, isError, refetch } = useGetSubmissionStatistics();

  const statistics = data?.data;

  const stats = [
    {
      title: "Total Submissions",
      value: statistics?.total ?? 0,
      icon: ClipboardList,
      description: "All project submissions",
    },
    {
      title: "Pending",
      value: statistics?.PENDING ?? 0,
      icon: Clock,
      description: "Awaiting review",
    },
    {
      title: "Approved",
      value: statistics?.APPROVED ?? 0,
      icon: CheckCircle2,
      description: "Approved projects",
    },
    {
      title: "Rejected",
      value: statistics?.REJECTED ?? 0,
      icon: XCircle,
      description: "Rejected projects",
    },
  ];

  if (isPending) {
    return <p className="py-10 text-center">Loading statistics...</p>;
  }

  if (isError) {
    return (
      <div className="py-10 text-center">
        <p className="mb-3">Failed to load statistics.</p>
        <Button onClick={() => refetch()} className="text-sm underline">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Submission Statistics</h1>
        <p className="text-sm text-muted-foreground">
          Overview of all student project submissions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
