import StudentDashboard from "@/components/layout/dashboard/student/students-submission";

export default function StudentPage() {
  return (
    <main className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Track your project submissions and review progress.
        </p>
      </div>

      <StudentDashboard />
    </main>
  );
}
