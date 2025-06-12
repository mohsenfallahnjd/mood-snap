import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center text-center row-start-2">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <h2 className="text-xl text-foreground/80">Page Not Found</h2>
        <p className="text-foreground/60 max-w-[400px]">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        >
          Return Home
        </Link>
      </main>
    </div>
  );
}
