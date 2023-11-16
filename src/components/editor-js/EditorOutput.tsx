'use client';

import { CustomCodeRenderer } from '@/components/editor-js/CustomCodeRenderer';
import { CustomImageRenderer } from '@/components/editor-js/CustomImageRenderer';
import { FC } from 'react';
import dynamic from 'next/dynamic';

const Output = dynamic(
	async () => (await import('editorjs-react-renderer')).default,
	{ ssr: false }
);

interface EditorOutputProps {
	content: any;
}

const renderers = {
	image: CustomImageRenderer,
	code: CustomCodeRenderer,
};

const style = {
	header: {
		textAlign: 'left',
		margin: '10px 20px',
	},
	paragraph: {
		fontSize: '16px',
	},
	list: {
		unorderedListItem: {
			margin: '0 10px',
			listStyle: 'disc',
		},
	},
	linkTool: {
		container: {
			backgroundColor: 'black',
		},
		textHolder: {
			backgroundColor: 'black',
		},
		title: { backgroundColor: 'black' },
		description: { backgroundColor: 'black' },
		image: { backgroundColor: 'black' },
		siteName: { backgroundColor: 'black' },
	},
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
	return (
		<section className="editor-js-output md:px-8 px-2">
			<Output
				style={style}
				className="text-sm"
				renderers={renderers}
				data={content}
			/>
		</section>
	);
};

export default EditorOutput;
