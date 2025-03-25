import { Trophy, Users } from 'lucide-react';

export default function Community() {
	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
			<div className='text-center mb-12'>
				<h2 className='text-3xl font-bold mb-4'>Join Our Community</h2>
				<p className='text-gray-400'>
					Connect with fellow enthusiasts and unlock exclusive rewards
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='bg-gray-800 p-8 rounded-xl'>
					<Trophy className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Rewards Program</h3>
					<p className='text-gray-400 mb-4'>
						Earn points with every purchase and unlock exclusive perks
					</p>
					<button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors'>
						Learn More
					</button>
				</div>
				<div className='bg-gray-800 p-8 rounded-xl'>
					<Users className='h-12 w-12 text-purple-500 mb-4' />
					<h3 className='text-xl font-semibold mb-2'>Events & Tournaments</h3>
					<p className='text-gray-400 mb-4'>
						Join our regular gaming tournaments and community events
					</p>
					<button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors'>
						View Events
					</button>
				</div>
			</div>
		</div>
	);
}
