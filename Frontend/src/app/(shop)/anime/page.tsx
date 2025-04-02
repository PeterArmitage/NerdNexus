'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Filter } from 'lucide-react';

// Placeholder anime data
const animeProducts = [
	{
		id: 1,
		title: 'Demon Slayer: Complete Box Set',
		image: 'https://via.placeholder.com/300x400',
		price: 149.99,
		category: 'Manga',
		rating: 4.9,
		stock: 15,
	},
	{
		id: 2,
		title: 'Attack on Titan Season 4 Blu-ray',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'Anime',
		rating: 4.8,
		stock: 22,
	},
	{
		id: 3,
		title: 'My Hero Academia: Manga Collection',
		image: 'https://via.placeholder.com/300x400',
		price: 129.99,
		category: 'Manga',
		rating: 4.7,
		stock: 8,
	},
	{
		id: 4,
		title: 'One Piece: East Blue Collection',
		image: 'https://via.placeholder.com/300x400',
		price: 79.99,
		category: 'Manga',
		rating: 4.9,
		stock: 5,
	},
	{
		id: 5,
		title: 'Jujutsu Kaisen Season 1 Complete Series',
		image: 'https://via.placeholder.com/300x400',
		price: 49.99,
		category: 'Anime',
		rating: 4.7,
		stock: 12,
	},
	{
		id: 6,
		title: 'Chainsaw Man Vol. 1-5 Bundle',
		image: 'https://via.placeholder.com/300x400',
		price: 64.99,
		category: 'Manga',
		rating: 4.8,
		stock: 10,
	},
	{
		id: 7,
		title: 'Naruto Shippuden: Complete Collection',
		image: 'https://via.placeholder.com/300x400',
		price: 199.99,
		category: 'Anime',
		rating: 4.8,
		stock: 3,
	},
	{
		id: 8,
		title: 'Dragon Ball Super: Manga Collection',
		image: 'https://via.placeholder.com/300x400',
		price: 89.99,
		category: 'Manga',
		rating: 4.6,
		stock: 14,
	},
];

// Anime categories
const categories = [
	{ name: 'All', count: animeProducts.length },
	{
		name: 'Manga',
		count: animeProducts.filter((p) => p.category === 'Manga').length,
	},
	{
		name: 'Anime',
		count: animeProducts.filter((p) => p.category === 'Anime').length,
	},
	{
		name: 'Merchandise',
		count: animeProducts.filter((p) => p.category === 'Merchandise').length,
	},
	{
		name: 'Blu-ray',
		count: animeProducts.filter((p) => p.category === 'Anime').length,
	},
];

export default function AnimePage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [filteredProducts, setFilteredProducts] = useState(animeProducts);
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	useEffect(() => {
		if (selectedCategory === 'All') {
			setFilteredProducts(animeProducts);
		} else {
			setFilteredProducts(
				animeProducts.filter((p) => p.category === selectedCategory)
			);
		}
	}, [selectedCategory]);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='text-center mb-10'>
				<h1 className='text-4xl font-bold text-white mb-4'>Anime & Manga</h1>
				<p className='text-gray-400 max-w-3xl mx-auto'>
					Explore our extensive collection of anime and manga products - from
					the latest releases to classic favorites and exclusive merchandise.
				</p>
			</div>

			<div className='lg:grid lg:grid-cols-4 lg:gap-8'>
				{/* Filter sidebar - desktop */}
				<div className='hidden lg:block bg-gray-800 rounded-lg shadow-lg p-6 self-start'>
					<h2 className='text-xl font-semibold mb-4'>Categories</h2>
					<ul className='space-y-2'>
						{categories.map((category) => (
							<li key={category.name}>
								<button
									className={`flex justify-between w-full px-3 py-2 rounded-md text-left ${
										selectedCategory === category.name
											? 'bg-purple-700 text-white'
											: 'hover:bg-gray-700'
									}`}
									onClick={() => setSelectedCategory(category.name)}
								>
									<span>{category.name}</span>
									<span className='text-gray-400'>{category.count}</span>
								</button>
							</li>
						))}
					</ul>

					<div className='mt-8'>
						<h2 className='text-xl font-semibold mb-4'>Price Range</h2>
						<div className='space-y-2'>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-1'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-1' className='ml-2'>
									Under $25
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-2'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-2' className='ml-2'>
									$25 - $50
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-3'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-3' className='ml-2'>
									$50 - $100
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-4'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-4' className='ml-2'>
									Over $100
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Mobile filter button */}
				<div className='lg:hidden mb-4'>
					<button
						onClick={() => setIsFilterOpen(!isFilterOpen)}
						className='flex items-center bg-gray-800 px-4 py-2 rounded-md w-full'
					>
						<Filter className='h-5 w-5 mr-2' />
						<span>Filter Products</span>
					</button>

					{/* Mobile filter dropdown */}
					{isFilterOpen && (
						<div className='bg-gray-800 rounded-lg shadow-lg p-4 mt-2'>
							<h2 className='text-lg font-semibold mb-2'>Categories</h2>
							<div className='grid grid-cols-2 gap-2 mb-4'>
								{categories.map((category) => (
									<button
										key={category.name}
										className={`px-3 py-2 rounded-md text-center ${
											selectedCategory === category.name
												? 'bg-purple-700 text-white'
												: 'bg-gray-700'
										}`}
										onClick={() => setSelectedCategory(category.name)}
									>
										{category.name} ({category.count})
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Product grid */}
				<div className='lg:col-span-3'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className='bg-gray-800 rounded-lg shadow-lg overflow-hidden'
							>
								<img
									src={product.image}
									alt={product.title}
									className='w-full h-64 object-cover'
								/>
								<div className='p-4'>
									<h3 className='text-lg font-semibold mb-2 line-clamp-2'>
										{product.title}
									</h3>
									<div className='flex justify-between items-center mb-2'>
										<span className='text-gray-400'>{product.category}</span>
										<span className='bg-purple-900 text-xs px-2 py-1 rounded-full'>
											★ {product.rating}
										</span>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-xl font-bold'>
											${product.price.toFixed(2)}
										</span>
										<span
											className={`text-sm ${
												product.stock < 5 ? 'text-red-500' : 'text-green-500'
											}`}
										>
											{product.stock < 5
												? `Only ${product.stock} left`
												: 'In Stock'}
										</span>
									</div>
									<div className='mt-4'>
										<Link
											href={`/anime/${product.id}`}
											className='block w-full bg-purple-600 hover:bg-purple-700 text-center py-2 rounded-md transition-colors'
										>
											View Details
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>

					{filteredProducts.length === 0 && (
						<div className='bg-gray-800 rounded-lg p-8 text-center'>
							<h3 className='text-xl font-semibold mb-2'>No products found</h3>
							<p className='text-gray-400'>
								Try changing your filter settings.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
