import SubmitProject from "@/components/form/submit-project-form";

export default function Submit() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl rounded-xl border bg-background p-6 shadow-sm sm:p-8">
        <SubmitProject />
      </div>
    </main>
  );
}
