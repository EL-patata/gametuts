'use client';
import Editor from '@/components/editor-js/Editor';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

type Props = { params: { groupName: string } };

const page: FC<Props> = async ({ params }) => {
	const user = await currentUser();

	if (!user) redirect(`/sign-in`);

	return (
		<>
			<Editor subredditName={params.groupName} />
		</>
	);
};

export default page;
