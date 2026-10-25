import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileCode2,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Upload,
    title: "Easy Submission",
    description:
      "Submit your project with live demo and GitHub links in just a few clicks.",
  },
  {
    icon: ShieldCheck,
    title: "Admin Review",
    description:
      "Get your projects reviewed and receive clear feedback on your submissions.",
  },
  {
    icon: Search,
    title: "Track Progress",
    description:
      "Monitor your submission status and stay updated throughout the review process.",
  },
  {
    icon: BarChart3,
    title: "Useful Statistics",
    description:
      "Get a clear overview of submitted, approved, and pending projects.",
  },
];

export default function Hero() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-blue-950/30 dark:via-background dark:to-indigo-950/20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium text-blue-600">
              <CheckCircle2 className="size-4" />
              Built for students and reviewers
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Submit Projects.
              <br />
              Track Progress.
              <br />
              <span className="text-blue-600">Achieve More.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              A simple platform to submit your projects, track review status,
              and manage the entire submission process in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg">
                <Link href="/register">Get Started</Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" />
                Easy to use
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-green-600" />
                Secure access
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/20 blur-3xl" />

            <div className="relative rounded-2xl border bg-card p-5 shadow-2xl sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Project Dashboard</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your submission overview
                  </p>
                </div>
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <FileCode2 className="size-6" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                  <p className="mt-2 text-3xl font-bold">12</p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="mt-2 text-3xl font-bold text-amber-500">03</p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">07</p>
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="mt-2 text-3xl font-bold text-red-500">02</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border p-4">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  <p className="font-semibold">Recent project activity</p>
                </div>

                <div className="flex items-center justify-between gap-3 rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-sm font-medium">Portfolio Website</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Project submission
                    </p>
                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
                    Approved
                  </span>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Illustrative dashboard preview
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Simple tools to make project submission and review more organized.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6 transition-colors hover:border-blue-300"
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl rounded-2xl bg-blue-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to manage your projects?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Create your account and keep your project submissions organized from
            start to finish.
          </p>
          <Button variant="secondary" size="lg" className="mt-6">
            <Link href="/register">Create an Account</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
