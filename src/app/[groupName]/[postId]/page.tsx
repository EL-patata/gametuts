'use client';
import { trpc } from '@/app/_trpc/client';
import CommentSection from '@/components/comments/CommentSection';
import EditorOutput from '@/components/editor-js/EditorOutput';
import GroupSideSection from '@/components/group/GroupSideSection';
import MainView from '@/components/MainView';
import PostLoading from '@/components/posts/PostLoading';
import Voting from '@/components/posts/Voting';
import { formatTimeToNow } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import { BiComment } from 'react-icons/bi';

type Props = {};

const Page: FC<Props> = ({}) => {
	const params = useParams();

	const { data: post, isLoading } = trpc.getPost.useQuery({
		id: params.postId as string,
	});

	return (
		<MainView
			MiddleSection={
				<>
					<h1 className="text-lg font-semibold text-muted-foreground flex items-center gap-1">
						Posted by
						<span className="text-foreground">{post?.author.username}</span>
						{!isLoading && (
							<span>{formatTimeToNow(new Date(post?.createdAt! || 1))}</span>
						)}
					</h1>
					{isLoading ? (
						<section className="p-4">
							<PostLoading />
						</section>
					) : (
						<section className="p-4">
							<EditorOutput content={post?.content} />
						</section>
					)}
					<div className="bg-background w-[200px] rounded mx-auto my-2 flex gap-2">
						<Voting postId={post?.id!} sideVariant={true} />
						<div className="flex items-center justify-center gap-2 font-bold">
							<BiComment className="w-6 h-6" />
							{post?.comments?.length}
						</div>
					</div>
					<CommentSection postId={post?.id!} />
				</>
			}
			RightAside={<GroupSideSection groupName={params.groupName as string} />}
		/>
	);
};

export default Page;
