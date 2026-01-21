import React, { useState } from "react";
import { useCreateBlog } from "@/hooks/useBlogs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "./ui/dialog";
import { PlusCircle, Loader2 } from "lucide-react";

export const BlogForm = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        coverImage: "",
        content: "",
    });

    const { mutate: createBlog, isPending } = useCreateBlog();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const categories = formData.category
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat !== "");

        createBlog(
            {
                ...formData,
                category: categories,
                date: new Date().toISOString(),
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    setFormData({
                        title: "",
                        category: "",
                        description: "",
                        coverImage: "",
                        content: "",
                    });
                },
            }
        );
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Create Blog
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Create New Blog Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Enter blog title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categories (comma-separated)</Label>
                        <Input
                            id="category"
                            name="category"
                            placeholder="TECH, FINANCE, EDUCATION"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="coverImage">Cover Image URL</Label>
                        <Input
                            id="coverImage"
                            name="coverImage"
                            type="url"
                            placeholder="https://images.pexels.com/..."
                            value={formData.coverImage}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Short Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="A brief summary of your blog"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="min-h-[80px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="content">Full Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            placeholder="Write your blog content here..."
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="min-h-[200px]"
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? "Creating..." : "Publish Blog"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
