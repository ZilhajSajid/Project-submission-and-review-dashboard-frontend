"use client";

import { useState } from "react";
import { useGetSubmissionAdmin } from "@/hooks";
import type { ISubmission } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FolderKanban,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Badge,
} from "lucide-react";

export default function AdminSubmissions() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, refetch, isFetching } =
    useGetSubmissionAdmin({ page, limit });

  // API response: data.data.data contains the submissions array.
  const submissions: ISubmission[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  // Pagination metadata returned by the backend.
  const meta = data?.data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const totalSubmissions = meta?.total ?? submissions.length;

  const stats = [
    {
      title: "Total Submissions",
      value: totalSubmissions,
      icon: FolderKanban,
    },
    {
      title: "Pending (This Page)",
      value: submissions.filter((s) => s.status === "PENDING").length,
      icon: Clock,
    },
    {
      title: "Approved (This Page)",
      value: submissions.filter((s) => s.status === "APPROVED").length,
      icon: CheckCircle2,
    },
    {
      title: "Rejected (This Page)",
      value: submissions.filter((s) => s.status === "REJECTED").length,
      icon: XCircle,
    },
  ];

  if (isError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-destructive">Failed to load student submissions.</p>

        <Button
          onClick={() => refetch()}
          variant="outline"
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <main className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Student Submissions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Review and manage projects submitted by students.
          </p>
        </div>

        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          variant="outline"
          className="self-start"
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </section>

      {/* Summary cards */}
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
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <p className="text-3xl font-bold">{stat.value}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Submissions table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">All Submissions</h2>

          <p className="text-sm text-muted-foreground">
            Browse submitted projects, review their status, and open project
            links.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        ) : submissions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <FolderKanban className="size-10 text-muted-foreground" />

              <h3 className="font-semibold">No submissions found</h3>

              <p className="max-w-md text-sm text-muted-foreground">
                Student project submissions will appear here when they are
                available.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[850px] text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b text-left">
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Student ID</th>
                  <th className="px-4 py-3 font-medium">Submitted At</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Project Links</th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    {/* Project details */}
                    <td className="max-w-sm px-4 py-4">
                      <p className="font-medium">{submission.projectName}</p>

                      <p className="mt-1 line-clamp-2 text-muted-foreground">
                        {submission.description}
                      </p>

                      {submission.rejectReason && (
                        <p className="mt-2 text-xs text-destructive">
                          Rejection reason: {submission.rejectReason}
                        </p>
                      )}
                    </td>

                    {/* Student ID */}
                    <td className="px-4 py-4 font-mono text-xs">
                      {submission.studentId}
                    </td>

                    {/* Submission date */}
                    <td className="whitespace-nowrap px-4 py-4">
                      {new Date(submission.createdAt).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </td>

                    {/* Submission status */}
                    <td className="px-4 py-4">
                      <Badge>{submission.status}</Badge>
                    </td>

                    {/* Live project and repository */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col items-start gap-2">
                        <a
                          href={submission.projectLiveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-primary"
                        >
                          Live Project
                          <ExternalLink className="size-3" />
                        </a>

                        <a
                          href={submission.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-primary"
                        >
                          GitHub Repository
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {meta?.page ?? page} of {totalPages}
            {" · "}
            {totalSubmissions} total submissions
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1 || isFetching}
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((current) => current + 1)}
              disabled={page >= totalPages || isFetching}
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
