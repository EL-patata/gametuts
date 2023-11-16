import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { db } from '@/db';

export const getUserCommentVote = privateProcedure
	.input(z.object({ commentId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { commentId } = input;

		const { userId } = ctx;

		if (!userId) return;

		const vote = await db.commentVote.findUnique({
			where: { userId_commentId: { commentId, userId } },
		});

		if (!vote) return { vote: null, found: false, type: null };
		else return { vote, found: true, type: vote.type };
	});
