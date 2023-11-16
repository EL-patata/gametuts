'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserForPropsType } from '@/types/user';
import { SignOutButton } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BiColorFill } from 'react-icons/bi';
import ThemeChanger from './ThemeChanger';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { MdPostAdd } from 'react-icons/md';
import { useParams } from 'next/navigation';
import { trpc } from '@/app/_trpc/client';
import JoinGroup from './group/JoinGroup';

type Props = {
	user: UserForPropsType;
};

const UserDropdownMenu: FC<Props> = ({ user }) => {
	const params = useParams();

	const {
		data: isSubscribed,
		refetch: refetchSubscriptionStatus,
		isLoading: isSubscripitionLoading,
	} = trpc.getUserSubscription.useQuery(
		{
			groupName: params.groupName as string,
		},
		{
			cacheTime: 0,
		}
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={`outline`} size={`lg`} className="gap-3">
					<span>Menu</span>
					<Avatar className="bg-background grid place-items-center">
						<AvatarImage
							className="w-6 h-6 rounded-full"
							src={user.imageUrl!}
						/>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="center" className="w-56">
				<DropdownMenuLabel className="text-center">
					{user.username}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{params?.groupName && !isSubscripitionLoading ? (
					<DropdownMenuGroup className="lg:hidden">
						<DropdownMenuGroup>
							{!isSubscribed?.subscription ? (
								<JoinGroup
									refetchSubscriptionStatus={refetchSubscriptionStatus}
									groupName={params.groupName as string}
								/>
							) : (
								<DropdownMenuItem>
									<Link
										href={`/${params.groupName}/post`}
										className="flex items-center gap-2 w-full"
									>
										<MdPostAdd className="w-4 h-4" />
										Create post
									</Link>
								</DropdownMenuItem>
							)}

							<DropdownMenuSeparator />
						</DropdownMenuGroup>
					</DropdownMenuGroup>
				) : null}
				<DropdownMenuGroup>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								href={`creategroup`}
								className="flex items-center gap-2 w-full"
							>
								<AiOutlineUsergroupAdd className="w-4 h-4" />
								Create group
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<BiColorFill className="w-4 h-4 mr-2" />
								<span>Themes</span>
							</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent className="grid grid-cols-3 gap-2">
									<ThemeChanger />
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuGroup>
					<DropdownMenuItem>
						<SignOutButton
							signOutCallback={() => {
								window.location.replace(`/`);
							}}
						>
							<Button className="w-full">
								<LogOut className="mr-2 h-4 w-4" />
								Sign out
							</Button>
						</SignOutButton>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdownMenu;
