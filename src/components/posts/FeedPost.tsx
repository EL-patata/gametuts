'use client';
import { formatTimeToNow } from '@/lib/utils';
import { FeedPostType } from '@/types/feed-posts';
import Link from 'next/link';
import { forwardRef, useRef } from 'react';
import EditorOutput from '../editor-js/EditorOutput';
import Voting from './Voting';
import { BiComment } from 'react-icons/bi';

type Props = { post: FeedPostType };

const FeedPost = forwardRef<HTMLLIElement, Props>(({ post }, ref) => {
	const sectionRef = useRef<HTMLDivElement>(null!);

	return (
		<li
			key={post?.id}
			ref={ref}
			className="min-h-[384px] grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]"
		>
			<section className="grid place-items-center order-2 md:-order-1">
				<Voting postId={post?.id} />
			</section>
			<section>
				<section className="px-4 py-2 grid gap-2 border-b border-border">
					{' '}
					<p className="text-muted-foreground ">
						Posted by{' '}
						<span className="text-foreground  font-semibold">
							{post.author.username}{' '}
						</span>
						in{' '}
						<Link
							href={`/${post.subreddit.name}`}
							className="text-primary hover:underline font-semibold"
						>
							{post.subreddit.name}
						</Link>{' '}
						{formatTimeToNow(new Date(post?.createdAt))}
					</p>
					<Link href={`/${post?.subreddit?.name}/${post?.id}`}>
						<h1 className="text-2xl font-bold">{post.title}</h1>
					</Link>
				</section>
				<section
					ref={sectionRef}
					className="max-h-[200px] overflow-hidden relative p-2"
				>
					<EditorOutput content={post.content} />
					{sectionRef?.current?.clientHeight === 200 ? (
						<div className="bg-gradient-to-tl from-background to-transparent absolute bottom-0 right-0 z-20 w-full	h-14" />
					) : null}
				</section>
				<p className="font-semibold max-[767px]:mx-auto flex mt-8 gap-2 justify-start rounded w-fit items-center p-2 bg-accent/50">
					<BiComment className="w-6 h-6" />
					{post.comments.length}
				</p>
			</section>
		</li>
	);
});

FeedPost.displayName = 'FeedPost';

export default FeedPost;
