import {
  getStatistics,
  getSubmissionAdmin,
  getSubmissionStudents,
  reviewSubmission,
  submitProject,
} from "@/api";
import { IReviewSubmissionPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSubmission() {
  return useMutation({
    mutationFn: submitProject,
  });
}
export function useGetStudentsSubmission() {
  return useQuery({
    queryKey: ["studentsSubmission"],
    queryFn: getSubmissionStudents,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 30_000,
  });
}

export function useGetSubmissionAdmin(params: {
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getSubmissionAdmin(params),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 30_000,
  });
}

export function useReviewSubmission() {
  return useMutation({
    mutationFn: ({
      submissionId,
      payload,
    }: {
      submissionId: string;
      payload: IReviewSubmissionPayload;
    }) => reviewSubmission(submissionId, payload),
  });
}

export function useGetSubmissionStatistics() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatistics(),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 30_000,
  });
}
