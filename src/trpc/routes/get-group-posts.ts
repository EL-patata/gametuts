import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';
import { TRPCError } from '@trpc/server';

export const getGroupPosts = publicProcedure
	.input(
		z.object({
			name: z.string(),
			limit: z.number().min(1).max(100),
			cursor: z.string().nullish(),
		})
	)
	.query(async ({ input }) => {
		const { name, limit, cursor } = input;

		let nextCursor: typeof cursor | undefined;

		const subreddit = await db.subreddit.findFirst({
			where: {
				name,
			},
		});

		if (!subreddit) throw new TRPCError({ code: 'NOT_FOUND' });

		const posts = await db.post.findMany({
			where: {
				subredditId: subreddit.id,
			},
			select: {
				id: true,
				title: true,
				createdAt: true,
				content: true,
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
