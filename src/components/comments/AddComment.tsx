'use client';
import { trpc } from '@/app/_trpc/client';
import {
	AddCommentSchemaType,
	addCommentSchema,
} from '@/validators/add-comment-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, SendHorizontal } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, buttonVariants } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';

type Props = {
	postId: string;
	refetchComments: any;
};

const AddComment: FC<Props> = ({ postId, refetchComments }) => {
	const { register, handleSubmit, reset } = useForm<AddCommentSchemaType>({
		resolver: zodResolver(addCommentSchema),
		defaultValues: {
			comment: '',
			postId,
			replyToId: null,
			commentId: null,
		},
	});

	const { mutate: addComment, isLoading: isAddingComment } =
		trpc.addComment.useMutation({
			onError: ({ data }) => {
				if (data?.code === 'UNAUTHORIZED')
					toast({
						className: `flex gap-4`,
						description: (
							<section className="flex gap-5 items-center">
								<p>You need to sign in to continue.</p>
								<Link
									href="/sign-in"
									className={buttonVariants({ variant: 'outline' })}
								>
									Sign in
								</Link>
							</section>
						),
					});
			},
			onSuccess: () => {
				reset();
				refetchComments();
			},
		});

	function onSubmit({
		comment,
		postId,
		replyToId,
		commentId,
	}: AddCommentSchemaType) {
		addComment({ comment, postId, replyToId, commentId });
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex items-center gap-2 my-4"
		>
			<Textarea
				disabled={isAddingComment}
				{...register('comment')}
				onKeyDown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();

						handleSubmit(onSubmit)();
					}
				}}
				className="resize-none bg-accent flex-1 min-h-10"
				placeholder="Add a comment..."
			/>
			<Button
				type="submit"
				disabled={isAddingComment}
				size={`icon`}
				className="rounded-full"
			>
				{isAddingComment ? (
					<Loader2 className="animate-spin" />
				) : (
					<SendHorizontal />
				)}
			</Button>
		</form>
	);
};

export default AddComment;
