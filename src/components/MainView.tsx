import { Children, FC, PropsWithChildren } from 'react';

type Props = {
	RightAside: React.ReactNode;
	MiddleSection: React.ReactNode;
};

const MainView: FC<Props> = ({ MiddleSection, RightAside }) => {
	return (
		<main className="bg-accent p-4 grid lg:grid-cols-[70%,30%] lg:px-56">
			<section>{MiddleSection}</section>
			<aside className="sticky hidden top-[80px] lg:grid gap-2 ml-4  h-min">
				{RightAside}
			</aside>
		</main>
	);
};

export default MainView;
