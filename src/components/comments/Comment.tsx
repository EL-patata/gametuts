'use client';
import { trpc } from '@/app/_trpc/client';
import { CommentExtended } from '@/types/comments';
import {
	AddCommentSchemaType,
	addCommentSchema,
} from '@/validators/add-comment-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Loader2, ReplyIcon, SendHorizontal } from 'lucide-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiChevronDown } from 'react-icons/bi';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import CommentVoting from './CommentVoting';
import Reply from './Reply';
import { formatTimeToNow } from '@/lib/utils';

type Props = {
	postId: string;
	comment: CommentExtended;
};

const Comment: FC<Props> = ({ comment, postId }) => {
	const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
	const [isRepliesOpen, setIsRepliesOpen] = useState<boolean>(false);

	const { data: replies, refetch: refetchReplies } = trpc.getReplies.useQuery({
		commentId: comment.id,
	});

	const { mutate: addReply, isLoading: isReplying } =
		trpc.addComment.useMutation();

	const { register, handleSubmit, reset } = useForm<AddCommentSchemaType>({
		resolver: zodResolver(addCommentSchema),
		defaultValues: {
			comment: '',
			postId,
			replyToId: comment?.id,
			commentId: comment?.id,
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
		setIsReplyOpen(false);
	}

	function toggleReply() {
		setIsReplyOpen((prev) => !prev);
	}

	function toggleReplies() {
		setIsRepliesOpen((prev) => !prev);
	}

	return (
		<div id={comment.id} className="grid gap-1 p-1">
			<div className="text-sm font-semibold  flex items-center gap-2">
				<Avatar className="w-6 h-6">
					<AvatarImage src={comment.author.image!} className="rounded-full" />
				</Avatar>
				{comment.author.username}
				<span className="font-normal text-muted-foreground ml-8">
					{formatTimeToNow(new Date(comment.createdAt))}
				</span>
			</div>
			<p className="px-3 py-1">{comment.text}</p>
			<div className="flex items-center gap-2">
				<CommentVoting commentId={comment.id} />
				<Button
					onClick={toggleReply}
					size={`icon`}
					variant={`outline`}
					className="rounded-full w-8 h-8"
				>
					<ReplyIcon className="w-4 h-4" />
				</Button>
				{comment.replies.length !== 0 ? (
					<Button
						onClick={toggleReplies}
						variant={`outline`}
						className="rounded-full gap-1 px-2 h-8"
					>
						{replies?.length}
						<BiChevronDown className="w-4 h-4" />
					</Button>
				) : null}
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
						placeholder={`reply to ${comment.author.username}`}
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
			{isRepliesOpen ? (
				<div className="ml-10">
					{replies?.map((reply) => (
						<Reply
							key={reply.id}
							postId={postId}
							commentId={comment.id}
							refetchReplies={refetchReplies}
							reply={reply as any}
						/>
					))}
				</div>
			) : null}
		</div>
	);
};

export default Comment;
