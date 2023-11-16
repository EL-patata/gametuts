'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

import { trpc } from '@/app/_trpc/client';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Users } from 'lucide-react';
import { useClickOutside, useDebouncedState } from '@mantine/hooks';
import Link from 'next/link';

type Props = {};

const Searchbar: FC<Props> = ({}) => {
	const [search, setSearch] = useDebouncedState<string>('', 300);

	const [commandRef, setCommandRef] = useState<HTMLDivElement | null>(null);
	useClickOutside(
		() => {
			setSearch('');
		},
		['click'],
		[commandRef]
	);
	const pathname = usePathname();
	const router = useRouter();

	const {
		isFetching,
		data: queryResults,
		refetch,
		isFetched,
	} = trpc.searchCommunities.useQuery({
		name: search,
	});

	useEffect(() => {
		refetch();
	}, [search]);

	return (
		<Command
			ref={setCommandRef}
			className="relative bg-background max-w-lg z-50  overflow-visible"
		>
			<CommandInput
				onClick={(e) => setSearch(e.currentTarget.value)}
				onValueChange={(text) => {
					setSearch(text);
				}}
				placeholder="Search communities..."
				className=" px-2 bg-background"
			/>

			{search.length > 0 && (
				<CommandList className="absolute bg-background top-full inset-x-0 shadow rounded-b-md">
					{isFetched && <CommandEmpty>No results found.</CommandEmpty>}
					{(queryResults?.length ?? 0) > 0 ? (
						<CommandGroup heading="Communities">
							{queryResults?.map((subreddit) => (
								<CommandItem
									onSelect={(e) => {
										router.push(`/r/${e}`);
										router.refresh();
									}}
									key={subreddit.id}
									value={subreddit.name}
									className="p-4 text-lg"
								>
									<Users className="mr-2 h-6 w-6" />
									<Link href={`/${subreddit.name}`} className="w-full">
										{subreddit.name}
									</Link>
								</CommandItem>
							))}
						</CommandGroup>
					) : null}
				</CommandList>
			)}
		</Command>
	);
};

export default Searchbar;
