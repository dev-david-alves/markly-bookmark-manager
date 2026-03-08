import * as z from "zod";

export const createBookmarkSchema = z.object({
	url: z.url("Invalid URL").min(1, "URL is required"),
	title: z.string().trim().min(1, "Title is required").max(100, "Maximum 100 characters allowed"),
	description: z.string().trim().max(100, "Maximum 100 characters allowed").optional(),
	tags: z
		.array(
			z.string().trim().min(1, "Tag cannot be empty").max(20, "Maximum 20 characters allowed")
		)
		.max(10, "Maximum 10 tags allowed")
		.optional(),
});

export type CreateBookmarkSchema = z.infer<typeof createBookmarkSchema>;
