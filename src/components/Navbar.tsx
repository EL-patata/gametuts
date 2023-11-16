'use client';
import { UserForPropsType } from '@/types/user';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import Searchbar from './Searchbar';
import UserDropdownMenu from './UserDropdownMenu';
import { buttonVariants } from './ui/button';

type Props = { user: UserForPropsType };

const Navbar: FC<Props> = ({ user }) => {
	return (
		<nav className="flex shadow  justify-between gap-3 items-center px-2 h-[62px] lg:px-28 bg-background sticky  border-b-border border-b z-40 top-0">
			<Link href={`/`} className="font-semibold text-2xl">
				Game<span className="text-primary">tuts</span>
			</Link>
			<Searchbar />
			{user && user?.id ? (
				<UserDropdownMenu user={user} />
			) : (
				<Link
					href={`/sign-in`}
					className={buttonVariants({
						variant: 'default',
						className: 'gap-2',
					})}
				>
					<LogIn className="w-4 aspect-square" />
					Sign in
				</Link>
			)}
		</nav>
	);
};

export default Navbar;
