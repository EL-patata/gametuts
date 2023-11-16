import { db } from '@/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure } from '../trpc';

export const getGroup = publicProcedure
	.input(z.object({ name: z.string() }))
	.query(async ({ input }) => {
		const { name } = input;

		const group = await db.subreddit.findFirst({
			where: {
				name,
			},
		});

		if (!group)
			throw new TRPCError({
				code: 'NOT_FOUND',
			});

		return group;
	});
