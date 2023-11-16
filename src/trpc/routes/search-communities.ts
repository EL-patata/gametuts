import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/db';

export const searchCommunities = publicProcedure
	.input(z.object({ name: z.string() }))
	.query(async ({ input }) => {
		const { name } = input;

		const groups = await db.subreddit.findMany({
			where: { name: { startsWith: name } },
		});

		return groups;
	});
