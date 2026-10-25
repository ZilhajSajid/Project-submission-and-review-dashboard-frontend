"use client";

import { useGetStudentsSubmission } from "@/hooks";

import { Skeleton } from "@/components/ui/skeleton";
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Badge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ISubmission } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StudentDashboard() {
  const { data, isLoading, isError, refetch, isFetching } =
    useGetStudentsSubmission();

  const submission: ISubmission | null = data?.data ?? null;

  const submissions: ISubmission[] = submission ? [submission] : [];

  const stats = [
    {
      title: "Total Submissions",
      value: submissions.length,
      icon: FolderKanban,
    },
    {
      title: "Pending",
      value: submissions.filter(
        (submission: ISubmission) => submission.status === "PENDING",
      ).length,
      icon: Clock,
    },
    {
      title: "Approved",
      value: submissions.filter(
        (submission: ISubmission) => submission.status === "APPROVED",
      ).length,
      icon: CheckCircle2,
    },
    {
      title: "Rejected",
      value: submissions.filter(
        (submission: ISubmission) => submission.status === "REJECTED",
      ).length,
      icon: XCircle,
    },
  ];

  if (isError) {
    return (
      <div className="space-y-3 p-6 text-center">
        <p className="text-destructive">Failed to load your submissions.</p>
        <Button
          onClick={() => refetch()}
          className="text-sm underline underline-offset-4"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <main className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Student Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your project submissions and review progress.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-2 self-start rounded-md border px-3 py-2 text-sm hover:bg-muted disabled:opacity-50"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stat.value}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">My Submissions</h2>
          <p className="text-sm text-muted-foreground">
            Your latest submitted projects and their statuses.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
              <FolderKanban className="size-10 text-muted-foreground" />
              <h3 className="font-semibold">No submissions yet</h3>
              <p className="max-w-md text-sm text-muted-foreground">
                Your projects will appear here after you submit them for review.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission: ISubmission) => (
              <Card key={submission.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <h3 className="font-semibold">{submission.projectName}</h3>

                    <Badge>{submission.status}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {submission.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={submission.projectLiveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Live Project
                    </a>

                    <a
                      href={submission.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      GitHub Repository
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
