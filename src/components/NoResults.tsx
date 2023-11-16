'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

type Props = {};

const NoResults: FC<Props> = ({}) => {
	return (
		<main className="h-[calc(100vh-62px)] bg-background flex flex-col justify-center gap-4 items-center">
			<h1 className="text-4xl font-bold">
				<span className="text-primary">No results</span>{' '}
				<span>were found.</span>
			</h1>
			<p className="text-2xl font-semibold text-muted-foreground">
				Nothing was found.
			</p>
			<Link href={`/`} className={buttonVariants()}>
				Return to homepage <AiOutlineHome className="ml-4 w-6 h-6" />
			</Link>
		</main>
	);
};

export default NoResults;
