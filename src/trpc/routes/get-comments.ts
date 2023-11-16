import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getComments = publicProcedure
	.input(z.object({ postId: z.string() }))
	.query(async ({ input }) => {
		const { postId } = input;

		const comments = await db.comment.findMany({
			where: {
				postId,
			},
			include: {
				author: true,
				replies: true,
			},
		});

		return comments;
	});
