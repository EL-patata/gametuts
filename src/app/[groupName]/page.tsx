'use client';
import FeedPost from '@/components/posts/FeedPost';
import GroupSideSection from '@/components/group/GroupSideSection';
import MainView from '@/components/MainView';
import { POST_QUERY_LIMIT } from '@/lib/post-query-limit';
import { useIntersection } from '@mantine/hooks';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '../_trpc/client';
import Loading from '@/components/posts/FeedPostsLoading';
import NoResults from '@/components/NoResults';

const Page = () => {
	const params = useParams();

	const { data: group } = trpc.getGroup.useQuery({
		name: params.groupName as string,
	});

	const { data, isLoading, fetchNextPage, error } =
		trpc.getGroupPosts.useInfiniteQuery(
			{
				limit: POST_QUERY_LIMIT,
				name: params.groupName as string,
			},
			{
				getNextPageParam: (lastPAge) => lastPAge.nextCursor,
				keepPreviousData: true,
			}
		);

	const posts = data?.pages.flatMap((post) => post.posts);

	const { ref, entry } = useIntersection({ threshold: 0.1 });

	useEffect(() => {
		if (entry?.isIntersecting) fetchNextPage();
	}, []);

	if (error?.data?.code === 'NOT_FOUND') return notFound();

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
					) : (
						<NoResults />
					)}
				</ul>
			}
			RightAside={
				<GroupSideSection
					groupName={group?.name as string}
					groupDescription={group?.description as string}
				/>
			}
		/>
	);
};

export default Page;
