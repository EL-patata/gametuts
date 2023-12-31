import { currentUser } from '@clerk/nextjs';
import { TRPCError, initTRPC } from '@trpc/server';
const t = initTRPC.create();

const isAuth = t.middleware(async ({ next }) => {
	const user = await currentUser();

	if (!user || !user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

	return next({
		ctx: {
			userId: user?.id,
			user,
		},
	});
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
