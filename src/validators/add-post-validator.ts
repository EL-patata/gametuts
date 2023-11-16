import z from 'zod';

export const addPostSchema = z.object({
	title: z
		.string()
		.min(3, {
			message: 'Title must be at least 3 characters.',
		})
		.max(120, { message: 'Title cannot be longer than 120 characters.' }),
	subredditName: z.string(),
	content: z.any(),
});

export type AddPostSchemaType = z.infer<typeof addPostSchema>;
