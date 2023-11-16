import { db } from '@/db';
import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const subscribe = privateProcedure
	.input(z.object({ groupName: z.string() }))
	.mutation(async ({ ctx, input }) => {
		const { groupName } = input;

		const { userId } = ctx;

		if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

		const group = await db.subreddit.findUnique({
			where: {
				name: groupName,
			},
		});

		if (!group) throw new TRPCError({ code: 'NOT_FOUND' });

		const subscription = await db.subscription.create({
			data: {
				userId,
				subredditId: group?.id,
			},
		});

		return subscription;
	});
