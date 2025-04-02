import Navigation from '@/app/components/Navigation/page';
import Footer from '@/app/components/Footer/page';

export default function ShopLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='bg-gray-900 min-h-screen'>
			<Navigation />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
