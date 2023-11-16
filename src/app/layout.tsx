import Navbar from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/context/Providers';
import { ThemeProvider } from '@/context/ThemeProvider';
import { db } from '@/db';
import { UserForPropsType } from '@/types/user';
import { ClerkProvider, currentUser } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Game tuts',
	description: 'tutorials for all games',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await currentUser();

	const dbUser = await db.user.findFirst({
		where: {
			id: user?.id,
		},
	});

	if (!dbUser) {
		await db.user.create({
			data: {
				id: user?.id,
				username: user?.username || `${user?.firstName} ${user?.lastName}`,
				email: user?.emailAddresses[0].emailAddress,
				image: user?.imageUrl,
			},
		});
	}

	const userForProps: UserForPropsType | undefined = {
		id: user?.id!,
		username: user?.username!,
		email: user?.emailAddresses[0].emailAddress!,
		imageUrl: user?.imageUrl!,
	};

	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className + 'min-h-screen bg-accent'}>
					<Providers>
						<ThemeProvider
							attribute="class"
							defaultTheme="rose"
							disableTransitionOnChange
						>
							<Navbar user={userForProps!} />
							{children}
							<Toaster />
						</ThemeProvider>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
