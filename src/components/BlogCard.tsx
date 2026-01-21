import type { Blog } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface BlogCardProps {
    blog: Blog;
    isSelected: boolean;
    onClick: () => void;
}

export const BlogCard = ({ blog, isSelected, onClick }: BlogCardProps) => {
    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:border-primary/50 mb-4",
                isSelected ? "border-primary ring-1 ring-primary" : ""
            )}
            onClick={onClick}
        >
            <CardHeader className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                    {blog.category.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-[10px] uppercase">
                            {cat}
                        </Badge>
                    ))}
                </div>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {blog.description}
                </p>
                <p className="text-xs text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    );
};
