import { privateProcedure } from '../trpc';

export const getCurrentUser = privateProcedure.query(async ({ ctx }) => {
	const { user } = ctx;
	if (!user) return { user: null, authed: false };
	return { user, authed: true };
});
