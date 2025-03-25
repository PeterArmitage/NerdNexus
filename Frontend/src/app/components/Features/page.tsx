import { Gamepad2, BookOpen, Users } from 'lucide-react';

export default function Features() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
				<div className='bg-gray-800 p-6 rounded-xl'>
					<Gamepad2 className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Gaming Paradise</h3>
					<p className='text-gray-400'>
						Latest releases, retro classics, and premium gaming accessories
					</p>
				</div>
				<div className='bg-gray-800 p-6 rounded-xl'>
					<BookOpen className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Anime & Manga Hub</h3>
					<p className='text-gray-400'>
						Extensive collection of anime merchandise and manga volumes
					</p>
				</div>
				<div className='bg-gray-800 p-6 rounded-xl'>
					<Users className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Vibrant Community</h3>
					<p className='text-gray-400'>
						Connect with fellow enthusiasts, share reviews, and join events
					</p>
				</div>
			</div>
		</div>
	);
}
