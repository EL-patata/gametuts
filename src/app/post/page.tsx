import { db } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { FC } from 'react';

type Props = {};

const page: FC<Props> = async ({}) => {
	const user = await currentUser();

	const userdb = await db.user.findFirst({
		where: {
			id: user?.id,
		},
		include: {
			subscriptions: true,
		},
	});

	return (
		<main className="grid place-items-center border border-border rounded outline outline-background bg-background m-4 p-4 lg:w-1/2">
			<h1 className="text-3xl font-bold">Post to</h1>
			<div>{JSON.stringify(userdb)}</div>
		</main>
	);
};

export default page;
