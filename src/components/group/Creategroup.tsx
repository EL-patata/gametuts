'use client';
import { trpc } from '@/app/_trpc/client';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { Textarea } from '../ui/textarea';

type Props = {};

const Creategroup: FC<Props> = ({}) => {
	const formSchema = z.object({
		name: z
			.string()
			.min(5, { message: 'Must be at least 5 characters.' })
			.max(25, { message: 'Cannot be longer than 25 characters.' })
			.refine((arg) => !arg.includes(' '), {
				message: 'Cannot include spaces.',
			}),
		description: z
			.string()
			.min(20, { message: 'Must be at least 20 characters.' })
			.max(175, { message: 'Cannot be longer than 175 characters.' }),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	const { mutate: addGroup } = trpc.addSubreddit.useMutation({
		onError: ({ message }) => {
			toast({
				title: 'Something went wrong.',
				description: message,
				variant: 'destructive',
			});
		},
		onSuccess: ({ name }) => {
			toast({
				title: 'Group created successfully.',
				description: 'Redirecting to the group...',
				variant: 'success',
			});

			router.push(`/${name}`);
		},
	});

	async function formSubmit({ name, description }: z.infer<typeof formSchema>) {
		addGroup({ name, description });
	}

	useEffect(() => {
		if (Object.keys(errors).length)
			for (const [_key, value] of Object.entries(errors))
				toast({
					title: 'Something went wrong.',
					description: (value as { message: string }).message,
					variant: 'destructive',
				});
	}, [errors]);

	return (
		<section className="w-1/2 p-4 bg-background border border-border mx-auto my-28 rounded">
			<h1 className="text-3xl font-bold text-primary">Create a group here</h1>
			<form
				onSubmit={handleSubmit(formSubmit)}
				className=" p-2 flex flex-col gap-2 items-start"
			>
				<Input
					{...register(`name`)}
					placeholder="e.g. darksouls"
					className="bg-input"
				/>
				<Textarea
					{...register(`description`)}
					placeholder="e.g. A group to discuss everything related to the lore,gameplay, and guides to bossfights."
					maxLength={175}
					className="h-36 resize-none bg-input"
				/>
				<Button type="submit" className="gap-2 mx-auto">
					<AiOutlineUsergroupAdd className="w-6 h-6" />
					Create group
				</Button>
			</form>
		</section>
	);
};

export default Creategroup;
