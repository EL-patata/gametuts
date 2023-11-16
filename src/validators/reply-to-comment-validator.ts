import z from 'zod';

export const replyToSchema = z.object({
	comment: z.string().min(1),
	postId: z.string(),
	replyToId: z.string(),
});

export type ReplyToSchemaType = z.infer<typeof replyToSchema>;
