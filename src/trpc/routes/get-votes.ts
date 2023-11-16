import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getVotes = publicProcedure
	.input(z.object({ postId: z.string() }))
	.query(async ({ input }) => {
		const { postId } = input;

		const votes = await db.vote.findMany({
			where: {
				postId,
			},
		});

		const accVotes = votes.reduce((acc, vote) => {
			if (vote.type === 'UP') return acc + 1;
			if (vote.type === 'DOWN') return acc - 1;
			return acc;
		}, 0);

		return accVotes;
	});
