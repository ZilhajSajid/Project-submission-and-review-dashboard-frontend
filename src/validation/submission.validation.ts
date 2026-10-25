import { z } from "zod";

export const ProjectSubmissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name cannot exceed 100 characters"),

  projectLiveLink: z
    .string()
    .trim()
    .url("Please enter a valid live project URL"),

  githubLink: z
    .string()
    .trim()
    .url("Please enter a valid GitHub repository URL"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
});

export type ProjectSubmissionInput = z.infer<typeof ProjectSubmissionSchema>;
