import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getCommentVotes = publicProcedure
	.input(z.object({ commentId: z.string() }))
	.query(async ({ input }) => {
		const { commentId } = input;

		const votes = await db.commentVote.findMany({
			where: {
				commentId,
			},
		});

		const accVotes = votes.reduce((acc, vote) => {
			if (vote.type === 'UP') return acc + 1;
			if (vote.type === 'DOWN') return acc - 1;
			return acc;
		}, 0);

		return accVotes;
	});
