'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

type Props = {};

const NotFound: FC<Props> = ({}) => {
	return (
		<main className="h-[calc(100vh-62px)] bg-background flex flex-col justify-center gap-4 items-center">
			<h1 className="text-4xl font-bold">
				<span className="text-primary">404</span> <span>Not found</span>{' '}
			</h1>
			<p className="text-2xl font-semibold text-muted-foreground">
				Page not found
			</p>
			<Link href={`/`} className={buttonVariants()}>
				Return to homepage <AiOutlineHome className="ml-4 w-6 h-6" />
			</Link>
		</main>
	);
};

export default NotFound;
