import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: [
		'/api/uploadthing',
		'/',
		'/:groupName',
		'/:groupName/:postId',
		'/(api|trpc)(.*)',
	],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/creategroup'],
};
