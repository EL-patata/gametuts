import { Comment, User } from '@prisma/client';

export type CommentExtended = Comment & {
	authorId: string;
	author: User;
	replies: CommentExtended[];
};
