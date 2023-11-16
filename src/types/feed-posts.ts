import { Comment, Post, Subreddit, User, Vote } from '@prisma/client';

export type FeedPostType = Post & {
	author: User;
	subreddit: Subreddit;
	comments: Comment[];
	votes: Vote[];
};

export type FeedPostTypeExtended = FeedPostType & { added: number };
