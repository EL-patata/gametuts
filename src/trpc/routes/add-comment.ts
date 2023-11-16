import { addCommentSchema } from '@/validators/add-comment-validator';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const addComment = privateProcedure
	.input(addCommentSchema)
	.mutation(async ({ ctx, input }) => {
		const { comment, postId, replyToId, commentId } = input;
		const { userId } = ctx;

		if (!userId)
			throw new TRPCError({
				code: 'UNAUTHORIZED',
			});

		const createdComment = await db.comment.create({
			data: {
				postId,
				authorId: userId,
				text: comment,
				replyToId,
				commentId,
			},
		});

		return { createdComment };
	});
