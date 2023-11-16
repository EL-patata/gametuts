'use client';
import { Button } from '@/components/ui/button';
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	return (
		<>
			<main className="grid place-items-center h-[calc(100vh-15rem)] z-[9999] fixed w-screen">
				<Button onClick={() => router.back()} className="self-baseline">
					Go back
				</Button>
				<SignUp />
			</main>
			<div
				aria-hidden
				className="bg-background fixed h-screen w-screen z-[9990] top-0"
			/>
		</>
	);
}
