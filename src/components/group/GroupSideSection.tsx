'use client';
import { FC } from 'react';
import SideCard from '../SideCard';
import Link from 'next/link';
import { Button, buttonVariants } from '../ui/button';
import { MdOutlinePostAdd } from 'react-icons/md';
import { trpc } from '@/app/_trpc/client';
import { UserPlus } from 'lucide-react';
import { toast } from '../ui/use-toast';

type Props = { groupName: string };

const GroupSideSection: FC<Props> = ({ groupName }) => {
	const { data: group } = trpc.getGroup.useQuery({
		name: groupName,
	});

	const {
		data: subscription,
		isLoading: isStatusLoading,
		refetch,
	} = trpc.getUserSubscription.useQuery({ groupName });
	const { mutate: subscribe } = trpc.subscribe.useMutation({
		onSuccess: () => {
			refetch();
			toast({
				title: `Subscribed successfully.`,
				variant: `success`,
			});
		},
	});

	return (
		<SideCard>
			<h1 className="font-bold text-2xl text-center">{groupName}</h1>
			<p className="text-muted-foreground text-center">{group?.description}</p>
			{!isStatusLoading && subscription?.subscription ? (
				<Link
					href={`/${groupName}/post`}
					className={buttonVariants({
						className: 'gap-2',
					})}
				>
					<MdOutlinePostAdd className="w-6 h-6" />
					Post to {groupName}
				</Link>
			) : (
				<Button onClick={() => subscribe({ groupName })} className="gap-2">
					<UserPlus className="w-6 h-6 " />
					Subscribe to {groupName}
				</Button>
			)}
		</SideCard>
	);
};

export default GroupSideSection;
