import Creategroup from '@/components/group/Creategroup';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { FC } from 'react';

type Props = {};

const page: FC<Props> = async ({}) => {
	const user = await currentUser();

	if (user) redirect(`/sign-in`);

	return (
		<main>
			<Creategroup />
		</main>
	);
};

export default page;
