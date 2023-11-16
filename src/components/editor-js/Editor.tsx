'use client';
import { trpc } from '@/app/_trpc/client';
import { uploadFiles } from '@/lib/uploadthing';
import {
	AddPostSchemaType,
	addPostSchema,
} from '@/validators/add-post-validator';
import type EditorJS from '@editorjs/editorjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { notFound, useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';

type Props = {
	subredditName: string;
};

const Editor: FC<Props> = ({ subredditName }) => {
	const { data: isSubscribed } = trpc.getUserSubscription.useQuery({
		groupName: subredditName,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddPostSchemaType>({
		resolver: zodResolver(addPostSchema),
		defaultValues: {
			title: '',
			subredditName,
			content: null,
		},
	});

	const router = useRouter();

	const { mutate: addPost } = trpc.addPost.useMutation({
		onError: ({ data }) => {
			toast({
				title: 'Something went wrong.',
				description: `${data?.code}`,
				variant: 'destructive',
			});
		},
	});

	const ref = useRef<EditorJS>();
	const _titleRef = useRef<HTMLTextAreaElement>(null);

	const [isMounted, setIsMounted] = useState<boolean>(false);

	const editorInit = useCallback(async () => {
		const EditorJS = (await import('@editorjs/editorjs')).default;
		//@ts-ignore
		const Header = (await import('@editorjs/header')).default;
		//@ts-ignore
		const Embed = (await import('@editorjs/embed')).default;
		//@ts-ignore
		const Table = (await import('@editorjs/table')).default;
		//@ts-ignore
		const List = (await import('@editorjs/list')).default;
		//@ts-ignore
		const Code = (await import('@editorjs/code')).default;
		//@ts-ignore
		const LinkTool = (await import('@editorjs/link')).default;
		//@ts-ignore
		const InlineCode = (await import('@editorjs/inline-code')).default;
		//@ts-ignore
		const ImageTool = (await import('@editorjs/image')).default;

		if (!ref.current) {
			const editor = new EditorJS({
				holder: 'editor',
				onReady() {
					ref.current = editor;
				},
				placeholder: 'Type here to write your post...',
				inlineToolbar: true,
				data: { blocks: [] },
				tools: {
					header: Header,
					linkTool: {
						class: LinkTool,
						config: {
							endpoint: '/api/link',
						},
					},
					image: {
						class: ImageTool,
						config: {
							uploader: {
								async uploadByFile(file: File) {
									// upload to uploadthing
									const [res] = await uploadFiles({
										endpoint: 'imageUploader',
										files: [file],
									});

									return {
										success: 1,
										file: {
											url: res.fileUrl,
										},
									};
								},
							},
						},
					},
					list: List,
					code: Code,
					inlineCode: InlineCode,
					table: Table,
					embed: Embed,
				},
			});
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') setIsMounted(true);
	}, []);

	useEffect(() => {
		async function init() {
			await editorInit();

			setTimeout(() => {
				_titleRef.current?.focus();
			}, 0);
		}

		if (isMounted) {
			init();

			return () => {
				ref.current?.destroy();
				ref.current = undefined;
			};
		}
	}, [isMounted]);

	useEffect(() => {
		if (Object.keys(errors).length)
			for (const [_key, value] of Object.entries(errors))
				toast({
					title: 'Something went wrong.',
					description: (value as { message: string }).message,
					variant: 'destructive',
				});
	}, [errors]);

	const { ref: titleRef, ...rest } = register('title');

	if (!isMounted) return null;

	async function onSubmit(data: AddPostSchemaType) {
		const blocks = await ref?.current?.save();

		addPost(
			{
				subredditName: 'darksouls3',
				title: data.title,
				content: blocks,
			},
			{
				onSuccess: ({ id }) => {
					router.push(`/${subredditName}/${id}`),
						toast({
							title: 'Post created successfully.',
							description: `Redirecting...`,
							variant: 'success',
						});
				},
			}
		);
	}

	if (!isSubscribed) return notFound();

	return (
		<form
			id="add-post-form"
			onSubmit={handleSubmit(onSubmit)}
			className="p-4 flex flex-col gap-2"
		>
			<h1 className="font-semibold text-2xl text-muted-foreground">
				Posting to <span className="text-foreground">{subredditName}</span>
			</h1>
			<Textarea
				{...rest}
				ref={(e) => {
					titleRef(e);
					//@ts-ignore
					_titleRef.current = e;
				}}
				className="resize-none text-2xl font-semibold h-24"
				placeholder="Title here..."
			/>
			<div id="editor" className="min-h-[600px] rounded p-1" />
			<Button form="add-post-form" type="submit" className="w-fit">
				Submit
			</Button>
		</form>
	);
};

export default Editor;
