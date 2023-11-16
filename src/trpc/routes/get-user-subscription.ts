import { db } from '@/db';
import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const getUserSubscription = privateProcedure
	.input(z.object({ groupName: z.string() }))
	.query(async ({ ctx, input }) => {
		const { groupName } = input;

		const { userId } = ctx;

		if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

		const group = await db.subreddit.findUnique({
			where: {
				name: groupName,
			},
		});

		if (!group) throw new TRPCError({ code: 'NOT_FOUND' });

		const subscription = await db.subscription.findUnique({
			where: {
				userId_subredditId: {
					userId,
					subredditId: group?.id,
				},
			},
		});

		return { subscription };
	});
