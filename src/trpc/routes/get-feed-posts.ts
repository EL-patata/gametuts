import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const getFeedPosts = publicProcedure
	.input(
		z.object({
			limit: z.number().min(1).max(100),
			cursor: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { limit, cursor } = input;

		let nextCursor: typeof cursor | undefined;

		const posts = await db.post.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				createdAt: true,
				updatedAt: true,
				author: true,
				subreddit: true,
				comments: true,
				votes: true,
			},
			take: limit + 1,
			cursor: cursor ? { id: cursor } : undefined,
		});

		if (posts.length > limit) {
			const nextItem = posts.pop();

			nextCursor = nextItem?.id;
		}

		return { posts, nextCursor };
	});
