'use client';
import React, { FC } from 'react';
import { Skeleton } from '../ui/skeleton';
import { cn } from '@/lib/utils';

type Props = {};

const PostLoading: FC<Props> = ({}) => {
	const styles = [
		`h-4 bg-primary w-[60%]`,
		`h-4 bg-primary w-[70%]`,
		`h-4 bg-primary w-[75%]`,
		`h-4 bg-primary w-[80%]`,
		`h-4 bg-primary w-[85%]`,
		`h-4 bg-primary w-[90%]`,
		`h-4 bg-primary w-[95%]`,
	];
	return (
		<main className="p-4 grid gap-2">
			{Array.from(Array(30).keys()).map((_, index) => (
				<Skeleton
					key={index}
					className={styles[Math.floor(Math.random() * styles.length)]}
				/>
			))}
		</main>
	);
};

export default PostLoading;
