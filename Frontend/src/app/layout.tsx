import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation/page';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'NerdNexus - Your Ultimate Gaming & Anime Destination',
	description:
		'Shop for the latest video games, anime, manga, and collectibles at NerdNexus.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body
				className={`${inter.className} bg-gray-900 text-white min-h-screen`}
			>
				<AuthProvider>
					<CartProvider>
						<Navigation />
						<main className='pt-16'>{children}</main>
					</CartProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
