import apiClient from "@/lib/apiClient";
import { IReviewSubmissionPayload, SubmissionPayload } from "@/types";

export function submitProject(payload: SubmissionPayload) {
  return apiClient("/submission/submit", { method: "POST", body: payload });
}
export function getSubmissionStudents() {
  return apiClient("/submission/my-submission");
}
export function getSubmissionAdmin(params: { page?: number; limit?: number }) {
  return apiClient("/submission/all-submissions", {
    params,
  });
}

export function reviewSubmission(
  submissionId: string,
  payload: IReviewSubmissionPayload,
) {
  return apiClient(`/submission/review-submission/${submissionId}`, {
    method: "PATCH",
    body: payload,
  });
}
export function getStatistics() {
  return apiClient("/submission/submission-stats");
}
