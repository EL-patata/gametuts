import { z } from 'zod';
import { privateProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';

export const voteComment = privateProcedure
	.input(
		z.object({
			commentId: z.string(),
			type: z.union([z.literal('UP'), z.literal('DOWN')]),
		})
	)
	.mutation(async ({ ctx, input }) => {
		const { commentId, type } = input;
		const { user, userId } = ctx;

		let confirmedVote;

		if (!user && !userId) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}

		const vote = await db.commentVote.findUnique({
			where: {
				userId_commentId: { commentId, userId },
			},
		});

		if (vote) {
			confirmedVote = vote;

			if (confirmedVote.type === type) {
				confirmedVote = null;
				await db.commentVote.delete({
					where: {
						userId_commentId: {
							commentId,
							userId,
						},
					},
				});
			} else {
				const updatedVote = await db.commentVote.update({
					where: {
						userId_commentId: {
							commentId,
							userId,
						},
					},
					data: { type },
				});
				confirmedVote = updatedVote;

				return { confirmedVote };
			}
		} else {
			const createdVote = await db.commentVote.create({
				data: {
					type,
					commentId,
					userId,
				},
			});

			if (createdVote) {
				confirmedVote = createdVote;

				if (confirmedVote.type === type) return { confirmedVote };
				else {
					try {
						const updatedVote = await db.commentVote.update({
							where: {
								userId_commentId: {
									commentId,
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
