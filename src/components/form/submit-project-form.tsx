"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { ProjectSubmissionSchema } from "@/validation";

import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useSubmission } from "@/hooks";

export default function ProjectSubmissionForm() {
  const { mutate: submitProject, isPending: submissionPending } =
    useSubmission();

  const form = useForm({
    defaultValues: {
      projectName: "",
      projectLiveLink: "",
      githubLink: "",
      description: "",
    },
    validators: {
      onSubmit: ProjectSubmissionSchema,
    },
    onSubmit: ({ value }) => {
      submitProject(value, {
        onSuccess: () => {
          toast.add({
            title: "Project Submitted Successfully",
            description: "Your project has been sent for review.",
            type: "success",
          });
        },
        onError: (err) => {
          toast.add({
            title: "Submission Failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Submit Your Project
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Provide your project details and submit them for review.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="projectName">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Project Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Enter your project name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="projectLiveLink">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Live Project URL</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="https://your-project.vercel.app"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="githubLink">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    GitHub Repository URL
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="url"
                    placeholder="https://github.com/username/repository"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Project Description
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Describe your project and its features"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                  />
                  <p className="text-xs text-muted-foreground">
                    {field.state.value.length}/1000 characters
                  </p>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button type="submit" disabled={submissionPending}>
            {submissionPending ? (
              <>
                <Spinner />
                Submitting...
              </>
            ) : (
              "Submit Project"
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
