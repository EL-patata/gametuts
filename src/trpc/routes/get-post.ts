import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getPost = publicProcedure
	.input(z.object({ id: z.string() }))
	.query(async ({ input }) => {
		const { id } = input;

		const post = await db.post.findFirst({
			where: { id },
			include: {
				subreddit: true,
				votes: true,
				author: true,
				comments: {
					select: {
						id: true,
					},
				},
			},
		});

		return post;
	});
