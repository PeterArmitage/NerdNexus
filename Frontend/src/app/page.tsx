import Navigation from '@/components/Navigation/page';
import Hero from '@/components/Hero/page';
import Features from '@/components/Features/page';
import FeaturedProducts from '@/components/FeaturedProducts/page';
import Community from '@/components/Community/page';
import Footer from '@/components/Footer/page';

export default function Home() {
	return (
		<div className='bg-gray-900 text-white'>
			<Navigation />
			<Hero />
			<Features />
			<FeaturedProducts />
			<Community />
			<Footer />
		</div>
	);
}
