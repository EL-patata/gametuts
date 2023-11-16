import z from 'zod';

export const addCommentSchema = z.object({
	comment: z.string().min(1),
	postId: z.string(),
	replyToId: z.string().nullable().optional(),
	commentId: z.string().nullable().optional(),
});

export type AddCommentSchemaType = z.infer<typeof addCommentSchema>;
