import { Gamepad2, BookOpen, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Features() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div className='bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors group'>
					<Gamepad2 className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Gaming Paradise</h3>
					<p className='text-gray-400 mb-4'>
						Latest releases, retro classics, and premium gaming accessories
					</p>
					<Link
						href='/products'
						className='inline-flex items-center text-purple-500 group-hover:text-purple-400'
					>
						Explore Games <ArrowRight className='h-4 w-4 ml-1' />
					</Link>
				</div>
				<div className='bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors group'>
					<BookOpen className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Anime & Manga Hub</h3>
					<p className='text-gray-400 mb-4'>
						Extensive collection of anime merchandise and manga volumes
					</p>
					<Link
						href='/anime'
						className='inline-flex items-center text-purple-500 group-hover:text-purple-400'
					>
						Discover Anime <ArrowRight className='h-4 w-4 ml-1' />
					</Link>
				</div>
				<div className='bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors group'>
					<Users className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Vibrant Community</h3>
					<p className='text-gray-400 mb-4'>
						Connect with fellow enthusiasts, share reviews, and join events
					</p>
					<Link
						href='/community'
						className='inline-flex items-center text-purple-500 group-hover:text-purple-400'
					>
						Join Community <ArrowRight className='h-4 w-4 ml-1' />
					</Link>
				</div>
			</div>
		</div>
	);
}
