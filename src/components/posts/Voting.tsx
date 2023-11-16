`use client`;
import { trpc } from '@/app/_trpc/client';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { BiDownvote, BiUpvote } from 'react-icons/bi';
import { Button, buttonVariants } from '../ui/button';
import { toast } from '../ui/use-toast';

type Props = { postId: string; sideVariant?: boolean };

const Voting: FC<Props> = ({ postId, sideVariant }) => {
	const utils = trpc.useContext();

	const { data: userData } = trpc.getCurrentUser.useQuery();

	const { data: votesCount, isLoading: isVotesLoading } =
		trpc.getVotes.useQuery({
			postId,
		});

	const { data: userVote, refetch: refetchUserVote } =
		trpc.getUserVote.useQuery({ postId });

	const {
		mutate: voteFn,
		data: vote,
		isLoading: isVotingLoading,
	} = trpc.vote.useMutation({
		onMutate: async ({ type, postId }) => {
			utils.getVotes.cancel({ postId });

			let oldVotesData = utils.getVotes.getData({ postId });

			utils.getVotes.setData({ postId }, () => {
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
		else voteFn({ postId, type });
	}

	useEffect(() => {
		refetchUserVote();
	}, []);

	return (
		<section
			className={cn(
				'grid place-items-center  grid-cols-3 md:grid-cols-1 gap-1 p-1 bg-accent/50 rounded',
				sideVariant && 'md:grid-cols-3'
			)}
		>
			<Button
				variant={`ghost`}
				size={`icon`}
				disabled={isVotingLoading}
				className={cn(
					'hover:text-green-500 hover:bg-green-500/20 rounded-full',
					userVote?.type === 'UP' && 'bg-green-500/20 text-green-500'
				)}
				onClick={() => handleVote('UP')}
			>
				<BiUpvote className="w-4 h-4 md:w-6 md:h-6" />
			</Button>
			<p className="font-bold p-2 grid text-center place-items-center">
				{isVotesLoading ? (
					<Loader2 className="animate-spin w-4 h-4 md:w-6 md:h-6" />
				) : (
					votesCount
				)}
			</p>
			<Button
				variant={`ghost`}
				size={`icon`}
				disabled={isVotingLoading}
				className={cn(
					'hover:text-rose-600 hover:bg-rose-500/20 rounded-full',
					userVote?.type === 'DOWN' && 'bg-rose-500/20 text-rose-500'
				)}
				onClick={() => handleVote('DOWN')}
			>
				<BiDownvote className="w-4 h-4 md:w-6 md:h-6" />
			</Button>
		</section>
	);
};

export default Voting;
