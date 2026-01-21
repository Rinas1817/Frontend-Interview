import { useState } from "react";
import { useBlogs, useBlog } from "./hooks/useBlogs";
import { BlogList } from "./components/BlogList";
import { BlogDetail } from "./components/BlogDetail";
import { BlogForm } from "./components/BlogForm";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: blogs,
    isLoading: isBlogsLoading,
    isError: isBlogsError,
    error: blogsError
  } = useBlogs();

  const {
    data: selectedBlog,
    isLoading: isBlogLoading,
    isError: isBlogError,
    error: blogError
  } = useBlog(selectedId);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105 active:scale-95"
            onClick={scrollToTop}
            role="button"
            aria-label="Scroll to top"
          >
            <img src="/logo.png" alt="CA Monk Logo" className="h-10 w-auto rounded" />
            <span className="text-xl font-bold tracking-tight hidden sm:block">Blogs</span>
          </div>
          <BlogForm />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {(isBlogsError || isBlogError) && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {(blogsError || blogError)?.message || "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 max-h-[calc(100vh-8rem)]">
            <div className="space-y-4 flex flex-col h-full">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Latest Posts
                </h2>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full font-medium">
                  {blogs?.length || 0}
                </span>
              </div>
              <div className="overflow-hidden">
                <BlogList
                  blogs={blogs}
                  isLoading={isBlogsLoading}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>
          </aside>

          <section className="lg:col-span-8 xl:col-span-9 bg-card border rounded-2xl shadow-sm p-6 md:p-10 min-h-screen">
            <BlogDetail
              blog={selectedBlog}
              isLoading={isBlogLoading}
              selectedId={selectedId}
            />
          </section>
        </div>
      </main>

      <footer className="border-t py-8 mt-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 CA Monk. All rights reserved.
          </p>
          <p className="text-sm font-medium text-muted-foreground">
            Built By Rinas
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
