import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getReplies = publicProcedure
	.input(z.object({ commentId: z.string() }))
	.query(async ({ input }) => {
		const { commentId } = input;

		const replies = await db.comment.findMany({
			where: {
				commentId,
			},
			include: {
				author: true,
				replies: true,
			},
		});

		return replies;
	});
