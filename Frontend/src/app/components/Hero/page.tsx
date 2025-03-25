export default function Hero() {
	return (
		<div className='relative overflow-hidden'>
			<div
				className='absolute inset-0 z-0'
				style={{
					backgroundImage:
						'url(https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					filter: 'brightness(0.4)',
				}}
			/>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<div className='py-32 md:py-48'>
					<h1 className='text-4xl md:text-6xl font-bold text-center mb-6'>
						Your Gateway to Gaming & Anime Culture
					</h1>
					<p className='text-xl text-center text-gray-300 mb-8'>
						Discover the ultimate collection of games, anime, and collectibles
					</p>
					<div className='flex justify-center space-x-4'>
						<button className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors'>
							Shop Now
						</button>
						<button className='bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-lg font-semibold transition-all'>
							Join Community
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
