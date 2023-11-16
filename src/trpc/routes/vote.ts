import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const vote = privateProcedure
	.input(
		z.object({
			postId: z.string(),
			type: z.union([z.literal('UP'), z.literal('DOWN')]),
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { postId, type } = input;
		const { user, userId } = ctx;

		let confirmedVote;

		if (!user && !userId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		const vote = await db.vote.findUnique({
			where: {
				userId_postId: { postId, userId },
			},
		});

		if (vote) {
			confirmedVote = vote;

			if (confirmedVote.type === type) {
				confirmedVote = null;
				await db.vote.delete({
					where: {
						userId_postId: {
							postId,
							userId,
						},
					},
				});
			} else {
				const updatedVote = await db.vote.update({
					where: {
						userId_postId: {
							postId,
							userId,
						},
					},
					data: { type },
				});
				confirmedVote = updatedVote;

				return { confirmedVote };
			}
		} else {
			const createdVote = await db.vote.create({
				data: {
					type,
					postId,
					userId,
				},
			});

			if (createdVote) {
				confirmedVote = createdVote;

				if (confirmedVote.type === type) return { confirmedVote };
				else {
					try {
						const updatedVote = await db.vote.update({
							where: {
								userId_postId: {
									postId,
									userId,
								},
							},
							data: {
								type,
							},
						});

						confirmedVote = updatedVote;

						return { confirmedVote };
					} catch (error) {
						console.log(error);
					}
				}
			}
		}
	});
