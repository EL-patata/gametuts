'use client';

import { useTheme } from 'next-themes';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export default function ThemeChanger() {
	const { setTheme, themes } = useTheme();

	return (
		<>
			{themes.map((theme) => {
				if (theme === 'system') return;
				return (
					<DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
						<div className={theme}>
							<div className={`${theme} w-6 h-6 theme-circle rounded-full`} />
						</div>
					</DropdownMenuItem>
				);
			})}
		</>
	);
}
