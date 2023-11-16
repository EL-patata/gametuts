`use client`;
import Image from 'next/image';

export function CustomImageRenderer(data: any) {
	const src = data.file.url;

	return (
		<div className="relative w-full min-h-[15rem]">
			<Image alt="image" src={src} fill className="object-contain" />
		</div>
	);
}
