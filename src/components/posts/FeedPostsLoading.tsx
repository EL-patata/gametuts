'use client';
import { FC } from 'react';
import { Skeleton } from '../ui/skeleton';
import { BiDownvote, BiUpvote } from 'react-icons/bi';

type Props = {};

const Loading: FC<Props> = ({}) => {
	return (
		<ul className="grid gap-2">
			<li className="min-h-[384px]  grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]">
				<section className="grid place-items-center order-2 md:-order-1">
					<div>
						<div className="w-[136px] grid-cols-3 md:grid-cols-1 h-[48px] md:h-[136px] md:w-[48px]  bg-accent/50 rounded grid place-items-center">
							<div className="bg-green-500/20 text-green-500 h-10 w-10 grid place-items-center rounded-full">
								<BiUpvote className="md:w-6 md:h-6 " />
							</div>
							<Skeleton className="h-6 w-6 bg-background" />
							<div className="bg-rose-500/20 text-rose-500 h-10 w-10 grid place-items-center rounded-full">
								<BiDownvote className="md:w-6 md:h-6 " />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="px-4 py-2 grid gap-2 max-h-[86px] border-b border-border">
						<Skeleton className="w-[60%] h-6" />
						<Skeleton className="w-[70%] h-8" />
					</div>
					<div className="px-4 py-2 grid gap-2">
						<Skeleton className="w-[80%] h-4" />
						<Skeleton className="w-[70%] h-4" />
						<Skeleton className="w-[90%] h-4" />
						<Skeleton className="w-[60%] h-4" />
						<Skeleton className="w-[65%] h-4" />
						<Skeleton className="w-[85%] h-4" />
						<Skeleton className="w-[50%] h-4" />
						<Skeleton className="w-[95%] h-4" />
					</div>
				</section>
			</li>
			<li className="min-h-[384px]  grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]">
				<section className="grid place-items-center order-2 md:-order-1">
					<div>
						<div className="w-[136px] grid-cols-3 md:grid-cols-1 h-[48px] md:h-[136px] md:w-[48px]  bg-accent/50 rounded grid place-items-center">
							<div className="bg-green-500/20 text-green-500 h-10 w-10 grid place-items-center rounded-full">
								<BiUpvote className="md:w-6 md:h-6 " />
							</div>
							<Skeleton className="h-6 w-6 bg-background" />
							<div className="bg-rose-500/20 text-rose-500 h-10 w-10 grid place-items-center rounded-full">
								<BiDownvote className="md:w-6 md:h-6 " />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="px-4 py-2 grid gap-2 max-h-[86px] border-b border-border">
						<Skeleton className="w-[60%] h-6" />
						<Skeleton className="w-[70%] h-8" />
					</div>
					<div className="px-4 py-2 grid gap-2">
						<Skeleton className="w-[80%] h-4" />
						<Skeleton className="w-[70%] h-4" />
						<Skeleton className="w-[90%] h-4" />
						<Skeleton className="w-[60%] h-4" />
						<Skeleton className="w-[65%] h-4" />
						<Skeleton className="w-[85%] h-4" />
						<Skeleton className="w-[50%] h-4" />
						<Skeleton className="w-[95%] h-4" />
					</div>
				</section>
			</li>
			<li className="min-h-[384px]  grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]">
				<section className="grid place-items-center order-2 md:-order-1">
					<div>
						<div className="w-[136px] grid-cols-3 md:grid-cols-1 h-[48px] md:h-[136px] md:w-[48px]  bg-accent/50 rounded grid place-items-center">
							<div className="bg-green-500/20 text-green-500 h-10 w-10 grid place-items-center rounded-full">
								<BiUpvote className="md:w-6 md:h-6 " />
							</div>
							<Skeleton className="h-6 w-6 bg-background" />
							<div className="bg-rose-500/20 text-rose-500 h-10 w-10 grid place-items-center rounded-full">
								<BiDownvote className="md:w-6 md:h-6 " />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="px-4 py-2 grid gap-2 max-h-[86px] border-b border-border">
						<Skeleton className="w-[60%] h-6" />
						<Skeleton className="w-[70%] h-8" />
					</div>
					<div className="px-4 py-2 grid gap-2">
						<Skeleton className="w-[80%] h-4" />
						<Skeleton className="w-[70%] h-4" />
						<Skeleton className="w-[90%] h-4" />
						<Skeleton className="w-[60%] h-4" />
						<Skeleton className="w-[65%] h-4" />
						<Skeleton className="w-[85%] h-4" />
						<Skeleton className="w-[50%] h-4" />
						<Skeleton className="w-[95%] h-4" />
					</div>
				</section>
			</li>
			<li className="min-h-[384px]  grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]">
				<section className="grid place-items-center order-2 md:-order-1">
					<div>
						<div className="w-[136px] grid-cols-3 md:grid-cols-1 h-[48px] md:h-[136px] md:w-[48px]  bg-accent/50 rounded grid place-items-center">
							<div className="bg-green-500/20 text-green-500 h-10 w-10 grid place-items-center rounded-full">
								<BiUpvote className="md:w-6 md:h-6 " />
							</div>
							<Skeleton className="h-6 w-6 bg-background" />
							<div className="bg-rose-500/20 text-rose-500 h-10 w-10 grid place-items-center rounded-full">
								<BiDownvote className="md:w-6 md:h-6 " />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="px-4 py-2 grid gap-2 max-h-[86px] border-b border-border">
						<Skeleton className="w-[60%] h-6" />
						<Skeleton className="w-[70%] h-8" />
					</div>
					<div className="px-4 py-2 grid gap-2">
						<Skeleton className="w-[80%] h-4" />
						<Skeleton className="w-[70%] h-4" />
						<Skeleton className="w-[90%] h-4" />
						<Skeleton className="w-[60%] h-4" />
						<Skeleton className="w-[65%] h-4" />
						<Skeleton className="w-[85%] h-4" />
						<Skeleton className="w-[50%] h-4" />
						<Skeleton className="w-[95%] h-4" />
					</div>
				</section>
			</li>
			<li className="min-h-[384px]  grid md:grid-cols-[10%,90%] w-full bg-background rounded border-border shadow-lg shadow-[hsl(var(--border))]">
				<section className="grid place-items-center order-2 md:-order-1">
					<div>
						<div className="w-[136px] grid-cols-3 md:grid-cols-1 h-[48px] md:h-[136px] md:w-[48px]  bg-accent/50 rounded grid place-items-center">
							<div className="bg-green-500/20 text-green-500 h-10 w-10 grid place-items-center rounded-full">
								<BiUpvote className="md:w-6 md:h-6 " />
							</div>
							<Skeleton className="h-6 w-6 bg-background" />
							<div className="bg-rose-500/20 text-rose-500 h-10 w-10 grid place-items-center rounded-full">
								<BiDownvote className="md:w-6 md:h-6 " />
							</div>
						</div>
					</div>
				</section>
				<section>
					<div className="px-4 py-2 grid gap-2 max-h-[86px] border-b border-border">
						<Skeleton className="w-[60%] h-6" />
						<Skeleton className="w-[70%] h-8" />
					</div>
					<div className="px-4 py-2 grid gap-2">
						<Skeleton className="w-[80%] h-4" />
						<Skeleton className="w-[70%] h-4" />
						<Skeleton className="w-[90%] h-4" />
						<Skeleton className="w-[60%] h-4" />
						<Skeleton className="w-[65%] h-4" />
						<Skeleton className="w-[85%] h-4" />
						<Skeleton className="w-[50%] h-4" />
						<Skeleton className="w-[95%] h-4" />
					</div>
				</section>
			</li>
		</ul>
	);
};

export default Loading;
