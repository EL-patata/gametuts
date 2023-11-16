import { router } from './trpc';
import { addPost } from './routes/add-post';
import { getPost } from './routes/get-post';
import { getFeedPosts } from './routes/get-feed-posts';
import { addSubreddit } from './routes/add-group';
import { getGroupPosts } from './routes/get-group-posts';
import { vote } from './routes/vote';
import { getVotes } from './routes/get-votes';
import { getUserVote } from './routes/get-user-vote';
import { addComment } from './routes/add-comment';
import { getComments } from './routes/get-comments';
import { getCurrentUser } from './routes/get-current-user';
import { getReplies } from './routes/get-replies';
import { voteComment } from './routes/vote-comment';
import { getCommentVotes } from './routes/get-comment-votes';
import { getUserCommentVote } from './routes/get-user-comment-vote';
import { getUserSubscription } from './routes/get-user-subscription';
import { subscribe } from './routes/subscribe';
import { searchCommunities } from './routes/search-communities';
import { getGroup } from './routes/get-group';

export const appRouter = router({
	getCurrentUser,
	addPost,
	getPost,
	getFeedPosts,
	addSubreddit,
	getGroup,
	getGroupPosts,
	vote,
	getVotes,
	getUserVote,
	addComment,
	getComments,
	getReplies,
	voteComment,
	getCommentVotes,
	getUserCommentVote,
	getUserSubscription,
	subscribe,
	searchCommunities,
});

export type AppRouter = typeof appRouter;
