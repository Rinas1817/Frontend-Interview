import type { Blog } from "@/types/blog";
import { BlogCard } from "./BlogCard";
import { Skeleton } from "./ui/skeleton";

interface BlogListProps {
    blogs?: Blog[];
    isLoading: boolean;
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const BlogList = ({ blogs, isLoading, selectedId, onSelect }: BlogListProps) => {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 border rounded-xl space-y-3">
                        <div className="flex gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                ))}
            </div>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center p-8 text-muted-foreground">
                No blogs found.
            </div>
        );
    }

    return (
        <div className="space-y-4 overflow-y-auto pr-2 max-h-[80vh] md:max-h-[calc(100vh-12rem)]">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedId === blog.id}
                    onClick={() => onSelect(blog.id)}
                />
            ))}
        </div>
    );
};
