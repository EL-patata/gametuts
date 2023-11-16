'use client';
import { trpc } from '@/app/_trpc/client';
import { cn, formatTimeToNow } from '@/lib/utils';
import { CommentExtended } from '@/types/comments';
import {
	AddCommentSchemaType,
	addCommentSchema,
} from '@/validators/add-comment-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Loader2, ReplyIcon, SendHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import CommentVoting from './CommentVoting';

type Props = {
	postId: string;
	commentId: string;
	reply: CommentExtended;
	refetchReplies: any;
};

const Reply: FC<Props> = ({ postId, reply, commentId, refetchReplies }) => {
	const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);

	const { mutate: addReply, isLoading: isReplying } =
		trpc.addComment.useMutation({
			onSuccess: () => {
				refetchReplies;
			},
		});

	const { register, handleSubmit, reset } = useForm<AddCommentSchemaType>({
		resolver: zodResolver(addCommentSchema),
		defaultValues: {
			comment: '',
			postId,
			replyToId: reply?.id,
			commentId,
		},
	});

	function onSubmit({
		comment,
		postId,
		replyToId,
		commentId,
	}: AddCommentSchemaType) {
		addReply({ comment, postId, replyToId, commentId });
		reset();
		refetchReplies();

		if (!isReplying) setIsReplyOpen(false);
	}

	function toggleReply() {
		setIsReplyOpen((prev) => !prev);
	}

	return (
		<div id={reply.id} className={cn(`p-2 rounded`)}>
			<div className="text-sm font-semibold   flex items-center gap-2">
				<Avatar className="w-6 h-6">
					<AvatarImage src={reply.author.image!} className="rounded-full" />
				</Avatar>
				{reply.author.username}
				<span className="font-normal text-muted-foreground ml-8">
					{formatTimeToNow(new Date(reply.createdAt))}
				</span>
			</div>
			<p className="px-3 py-1">{reply.text}</p>
			<div className="flex items-center gap-2">
				<CommentVoting commentId={reply.id!} />
				<Button
					onClick={toggleReply}
					size={`icon`}
					variant={`outline`}
					className="rounded-full w-8 h-8"
				>
					<ReplyIcon className="w-4 h-4" />
				</Button>
			</div>
			{isReplyOpen ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex items-center gap-2"
				>
					<Textarea
						disabled={isReplying}
						{...register('comment')}
						onKeyDown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();

								handleSubmit(onSubmit)();
							}
						}}
						className="resize-none bg-accent flex-1 min-h-6 max-h-10"
						placeholder={`reply to ${reply.author.username}`}
					/>
					<Button
						disabled={isReplying}
						size={`icon`}
						className="rounded-full h-8 w-8"
					>
						{isReplying ? (
							<Loader2 className="animate-spin" />
						) : (
							<SendHorizontal />
						)}
					</Button>
				</form>
			) : null}
		</div>
	);
};

export default Reply;
