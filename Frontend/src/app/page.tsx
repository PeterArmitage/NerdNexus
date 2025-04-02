'use client';

import Navigation from '@/app/components/Navigation/page';
import Hero from '@/app/components/Hero/page';
import Features from '@/app/components/Features/page';
import FeaturedProducts from '@/app/components/FeaturedProducts/page';
import Community from '@/app/components/Community/page';
import Footer from '@/app/components/Footer/page';

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
