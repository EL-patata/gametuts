import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const addSubreddit = privateProcedure
	.input(z.object({ name: z.string(), description: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { name, description } = input;
		const { userId: creatorId } = ctx;

		if (!creatorId) throw new TRPCError({ code: 'UNAUTHORIZED' });

		const subredditExists = await db.subreddit.findFirst({
			where: {
				name,
			},
		});

		if (subredditExists)
			throw new TRPCError({
				code: 'CONFLICT',
				message: 'Group already exists.',
			});

		const group = await db.subreddit.create({
			data: {
				name,
				description,
				creatorId,
			},
		});

		const subscribe = await db.subscription.create({
			data: {
				subredditId: group?.id,
				userId: group.creatorId!,
			},
		});
		return group;
	});
