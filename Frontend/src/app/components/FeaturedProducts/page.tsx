import { Star } from 'lucide-react';

export default function FeaturedProducts() {
	return (
		<div className='bg-gray-800 py-24'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<h2 className='text-3xl font-bold mb-12 text-center'>
					Featured Products
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className='bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform'
						>
							<img
								src={`https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
								alt='Product'
								className='w-full h-48 object-cover'
							/>
							<div className='p-4'>
								<div className='flex items-center mb-2'>
									<Star className='h-4 w-4 text-yellow-500' />
									<span className='text-sm text-gray-400 ml-1'>4.9</span>
								</div>
								<h3 className='font-semibold mb-1'>
									Limited Edition Collectible
								</h3>
								<p className='text-gray-400 text-sm mb-3'>
									Premium Quality Figure
								</p>
								<div className='flex items-center justify-between'>
									<span className='font-bold'>$59.99</span>
									<button className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors'>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
