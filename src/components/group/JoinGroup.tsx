'use client';
import { FC } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { UserPlus } from 'lucide-react';
import { trpc } from '@/app/_trpc/client';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
	groupName: string;
	refetchSubscriptionStatus: any;
};

const JoinGroup: FC<Props> = ({ groupName, refetchSubscriptionStatus }) => {
	const router = useRouter();
	const { mutate } = trpc.subscribe.useMutation({
		onSuccess: () => {
			router.push(`/${groupName}`),
				toast({
					title: `Subscribed successfully.`,
					variant: `success`,
				});

			refetchSubscriptionStatus();
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
		},
	});

	function handleJoinGroup() {
		mutate({ groupName });
	}

	return (
		<DropdownMenuItem
			className="cursor-pointer gap-2"
			onClick={handleJoinGroup}
		>
			<UserPlus className="w-4 h-4" />
			Join {groupName}
		</DropdownMenuItem>
	);
};

export default JoinGroup;
