`use client`;
import { trpc } from '@/app/_trpc/client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { Button, buttonVariants } from '../ui/button';
import { toast } from '../ui/use-toast';

type Props = { commentId: string };

const CommentVoting: FC<Props> = ({ commentId }) => {
	const utils = trpc.useContext();

	const { data: userData } = trpc.getCurrentUser.useQuery();

	const { data: votesCount, isLoading: isVotesLoading } =
		trpc.getCommentVotes.useQuery({
			commentId,
		});

	const { data: userVote, refetch: refetchUserVote } =
		trpc.getUserCommentVote.useQuery({ commentId });

	const {
		mutate: voteFn,
		data: vote,
		isLoading: isVotingLoading,
	} = trpc.voteComment.useMutation({
		onMutate: async ({ type, commentId }) => {
			utils.getCommentVotes.cancel({ commentId });

			let oldVotesData = utils.getCommentVotes.getData({ commentId });

			utils.getCommentVotes.setData({ commentId }, () => {
				if (userVote?.type === 'UP') {
					if (type === 'DOWN') return oldVotesData! - 2;
					return oldVotesData! - 1;
				}
				if (userVote?.type === 'DOWN') {
					if (type === 'UP') return oldVotesData! + 2;
					return oldVotesData! + 1;
				}
				if (type === 'DOWN' && !vote) return oldVotesData! - 1;
				if (type === 'UP' && !vote) return oldVotesData! + 1;
			});
		},

		onSuccess: async () => {
			utils.getVotes.invalidate();
			refetchUserVote();
		},

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

			utils.getVotes.invalidate();
			refetchUserVote();
		},
	});

	function handleVote(type: 'UP' | 'DOWN') {
		if (userData?.authed === false && !userData.user) return;
		else voteFn({ commentId, type });
	}

	return (
		<section className="grid place-items-center grid-cols-3 gap-1">
			<Button
				variant={`ghost`}
				size={`icon`}
				disabled={isVotingLoading}
				className={cn(
					'hover:text-green-500 hover:bg-green-500/20 rounded-full h-8 w-8',
					userVote?.type === 'UP' && 'bg-green-500/20 text-green-500'
				)}
				onClick={() => handleVote('UP')}
			>
				<BiUpvote className="w-4 h-4 " />
			</Button>
			<p className="font-bold p-2 grid text-center place-items-center">
				{isVotesLoading ? (
					<Loader2 className="animate-spin w-4 h-4 " />
				) : (
					<span>{votesCount}</span>
				)}
			</p>
			<Button
				variant={`ghost`}
				size={`icon`}
				disabled={isVotingLoading}
				className={cn(
					'hover:text-rose-600 hover:bg-rose-500/20 rounded-full h-8 w-8',
					userVote?.type === 'DOWN' && 'bg-rose-500/20 text-rose-500'
				)}
				onClick={() => handleVote('DOWN')}
			>
				<BiDownvote className="w-4 h-4 " />
			</Button>
		</section>
	);
};

export default CommentVoting;
