export interface SubmissionPayload {
  projectName: string;
  projectLiveLink: string;
  githubLink: string;
  description: string;
}
export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ISubmission {
  id: string;
  projectName: string;
  projectLiveLink: string;
  githubLink: string;
  description: string;
  status: SubmissionStatus;
  reviewedById: string | null;
  reviewedAt: string | null;
  rejectReason: string | null;
  createdAt: string;
  updatedAt: string;
  studentId: string;
}

export interface IReviewSubmissionPayload {
  status: "APPROVED" | "REJECTED";
}
