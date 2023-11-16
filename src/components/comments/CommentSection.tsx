'use client';
import { trpc } from '@/app/_trpc/client';
import { FC } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

type Props = {
	postId: string;
};

const CommentSection: FC<Props> = ({ postId }) => {
	const { data: comments, refetch: refetchComments } =
		trpc.getComments.useQuery({ postId });

	if (comments?.length === 0)
		return (
			<section className="bg-background p-4 rounded outline outline-background border border-border">
				<AddComment refetchComments={refetchComments} postId={postId} />
				<h1 className="text-2xl font-bold h-[20vh] grid place-items-center">
					No comments yet.
				</h1>
			</section>
		);
	return (
		<section className="bg-background p-4 rounded outline outline-background border border-border">
			<AddComment refetchComments={refetchComments} postId={postId} />
			<div>
				{comments?.map(
					(comment) =>
						comment.replyToId === null && (
							<Comment
								key={comment.id}
								postId={postId}
								comment={comment as any}
							/>
						)
				)}
			</div>
		</section>
	);
};

export default CommentSection;
