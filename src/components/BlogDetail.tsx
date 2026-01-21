import type { Blog } from "@/types/blog";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Calendar, Tag } from "lucide-react";

interface BlogDetailProps {
    blog?: Blog;
    isLoading: boolean;
    selectedId: string | null;
}

export const BlogDetail = ({ blog, isLoading, selectedId }: BlogDetailProps) => {
    if (!selectedId) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-xl text-muted-foreground">
                Select a blog to view details
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-[300px] w-full rounded-xl" />
                <Skeleton className="h-10 w-3/4" />
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        );
    }

    if (!blog) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
            />

            <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="outline" className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {cat}
                        </Badge>
                    ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{blog.title}</h1>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(blog.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>

                <p className="text-xl text-muted-foreground font-medium italic">
                    {blog.description}
                </p>

                <div className="prose prose-slate max-w-none dark:prose-invert">
                    {blog.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 text-lg leading-relaxed text-foreground/90">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};
