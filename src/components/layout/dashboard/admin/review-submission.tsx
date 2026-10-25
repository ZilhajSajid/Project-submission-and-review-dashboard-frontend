"use client";

import { useState } from "react";
import { Badge, ExternalLink, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetSubmissionAdmin, useReviewSubmission } from "@/hooks";
import type { ISubmission } from "@/types";

export default function SubmissionReview() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, refetch, isFetching } =
    useGetSubmissionAdmin({ page, limit: 10 });

  const {
    mutate: reviewSubmission,
    isPending: isReviewing,
    variables,
  } = useReviewSubmission();

  const submissions: ISubmission[] = Array.isArray(data?.data?.data)
    ? data.data.data
    : [];

  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const getStatusVariant = (status: ISubmission["status"]) => {
    switch (status) {
      case "APPROVED":
        return "default" as const;
      case "REJECTED":
        return "destructive" as const;
      default:
        return "secondary" as const;
    }
  };

  const handleReview = (
    submissionId: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    reviewSubmission({
      submissionId,
      payload: { status },
    });
  };

  if (isPending) {
    return <p className="py-10 text-center">Loading submissions...</p>;
  }

  if (isError) {
    return (
      <div className="space-y-3 py-10 text-center">
        <p>Failed to load submissions.</p>
        <Button onClick={() => refetch()} variant="outline">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Review Submissions</h1>
          <p className="text-sm text-muted-foreground">
            Review and approve student projects.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw className="mr-2 size-4" />
          Refresh
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No submissions found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission) => {
            const isCurrentReviewing =
              isReviewing && variables?.submissionId === submission.id;

            return (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle>{submission.projectName}</CardTitle>
                      <CardDescription>
                        Submitted on{" "}
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>

                    <Badge>{submission.status}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm">{submission.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <a
                        href={submission.projectLiveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Project
                      </a>
                    </Button>

                    <Button variant="outline" size="sm">
                      <a
                        href={submission.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    </Button>
                  </div>

                  {submission.status === "PENDING" && (
                    <div className="flex gap-2 border-t pt-4">
                      <Button
                        onClick={() => handleReview(submission.id, "APPROVED")}
                        disabled={isReviewing}
                      >
                        {isCurrentReviewing &&
                        variables?.payload.status === "APPROVED"
                          ? "Approving..."
                          : "Approve"}
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleReview(submission.id, "REJECTED")}
                        disabled={isReviewing}
                      >
                        {isCurrentReviewing &&
                        variables?.payload.status === "REJECTED"
                          ? "Rejecting..."
                          : "Reject"}
                      </Button>
                    </div>
                  )}

                  {submission.status === "REJECTED" &&
                    submission.rejectReason && (
                      <p className="text-sm text-destructive">
                        Reason: {submission.rejectReason}
                      </p>
                    )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Page {meta?.page ?? page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={page <= 1 || isFetching}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            disabled={page >= totalPages || isFetching}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
