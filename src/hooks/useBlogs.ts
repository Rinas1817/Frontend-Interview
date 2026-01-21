import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as blogApi from "../api/blogApi";
import type { CreateBlogInput } from "../types/blog";

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: blogApi.fetchBlogs,
    });
};

export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: ["blogs", id],
        queryFn: () => blogApi.fetchBlogById(id!),
        enabled: !!id,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (blog: CreateBlogInput) => blogApi.createBlog(blog),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};
