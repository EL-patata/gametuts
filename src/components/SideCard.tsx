'use client';
import { FC, PropsWithChildren } from 'react';

const SideCard: FC<PropsWithChildren> = ({ children }) => {
	return (
		<section className="bg-background border border-border outline outline-background p-4 rounded-lg grid place-items-center gap-4">
			{children}
		</section>
	);
};

export default SideCard;
