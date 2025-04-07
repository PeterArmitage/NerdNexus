import Footer from '@/app/components/Footer/page';

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-gray-900 min-h-screen'>
			<main>{children}</main>
			<Footer />
		</div>
	);
}
