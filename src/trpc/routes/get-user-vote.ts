import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { db } from '@/db';

export const getUserVote = privateProcedure
	.input(z.object({ postId: z.string() }))
	.query(async ({ ctx, input }) => {
		const { postId } = input;

		const { userId } = ctx;

		if (!userId) return;

		const vote = await db.vote.findUnique({
			where: { userId_postId: { postId, userId } },
		});

		if (!vote) return { vote: null, found: false, type: null };
		else return { vote, found: true, type: vote.type };
	});
