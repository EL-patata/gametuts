'use client';

import Loading from '@/components/posts/FeedPostsLoading';
import MainView from '@/components/MainView';
import SideCard from '@/components/SideCard';
import FeedPost from '@/components/posts/FeedPost';
import { buttonVariants } from '@/components/ui/button';
import { POST_QUERY_LIMIT } from '@/lib/post-query-limit';
import { useIntersection } from '@mantine/hooks';
import Link from 'next/link';
import { useEffect } from 'react';
import { trpc } from './_trpc/client';
import { TbUsersPlus } from 'react-icons/tb';

export default function Home() {
	const { ref, entry } = useIntersection({ threshold: 0.1 });

	const { data, fetchNextPage, isLoading } = trpc.getFeedPosts.useInfiniteQuery(
		{
			limit: POST_QUERY_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage?.nextCursor,
			keepPreviousData: true,
		}
	);

	const posts = data?.pages.flatMap((page) => page?.posts);

	useEffect(() => {
		if (entry?.isIntersecting) fetchNextPage();
	}, [entry, fetchNextPage]);

	return (
		<MainView
			MiddleSection={
				<ul className="grid gap-2 w-full">
					{posts && posts.length > 0 ? (
						posts.map((post, i) => {
							if (i === posts.length - 1)
								return <FeedPost key={post.id} post={post as any} ref={ref} />;

							return <FeedPost post={post as any} key={post.id} />;
						})
					) : isLoading ? (
						<Loading />
					) : null}
				</ul>
			}
			RightAside={
				<>
					<SideCard>
						<h1 className="font-bold flex items-center gap-1 text-2xl">
							<TbUsersPlus className="w-8 h-8" /> Create group
						</h1>
						<Link href={`/creategroup`} className={buttonVariants()}>
							Create a group from here
						</Link>
					</SideCard>
				</>
			}
		/>
	);
}
