import { addPostSchema } from '@/validators/add-post-validator';
import { privateProcedure } from '../trpc';
import { db } from '@/db';
import { TRPCError } from '@trpc/server';

export const addPost = privateProcedure
	.input(addPostSchema)
	.mutation(async ({ input, ctx }) => {
		const { subredditName, title, content } = input;
		const { userId: authorId } = ctx;

		const subreddit = await db.subreddit.findFirst({
			where: {
				name: subredditName,
			},
		});

		if (!subreddit)
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'subreddit not found.',
			});

		const post = await db.post.create({
			data: {
				title,
				subredditId: subreddit?.id,
				authorId,
				content,
			},
		});

		return post;
	});
