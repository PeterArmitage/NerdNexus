'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Filter, Star, ArrowRight, ShoppingCart } from 'lucide-react';

// Placeholder collectibles data
const collectiblesData = [
	{
		id: 1,
		title: 'Goku Ultra Instinct Figure',
		image: 'https://via.placeholder.com/300x300',
		price: 129.99,
		category: 'Action Figures',
		rating: 4.8,
		stock: 7,
		featured: true,
		description: 'Limited edition Goku Ultra Instinct figure with LED effects.',
	},
	{
		id: 2,
		title: 'Star Wars The Mandalorian Helmet Replica',
		image: 'https://via.placeholder.com/300x300',
		price: 249.99,
		category: 'Replicas',
		rating: 4.9,
		stock: 3,
		featured: true,
		description: 'Full-scale wearable replica of the Mandalorian helmet.',
	},
	{
		id: 3,
		title: 'Pokemon TCG Booster Box',
		image: 'https://via.placeholder.com/300x300',
		price: 119.99,
		category: 'Trading Cards',
		rating: 4.7,
		stock: 12,
		featured: false,
		description: 'Scarlet & Violet booster box with 36 packs.',
	},
	{
		id: 4,
		title: 'Legend of Zelda Master Sword Replica',
		image: 'https://via.placeholder.com/300x300',
		price: 159.99,
		category: 'Replicas',
		rating: 4.6,
		stock: 8,
		featured: false,
		description:
			'Full-scale replica of the iconic Master Sword with display stand.',
	},
	{
		id: 5,
		title: 'Marvel Avengers Iron Man Mask',
		image: 'https://via.placeholder.com/300x300',
		price: 189.99,
		category: 'Replicas',
		rating: 4.5,
		stock: 5,
		featured: false,
		description:
			'Electronic Iron Man helmet with light-up eyes and sound effects.',
	},
	{
		id: 6,
		title: 'Yu-Gi-Oh! Legendary Collection',
		image: 'https://via.placeholder.com/300x300',
		price: 79.99,
		category: 'Trading Cards',
		rating: 4.7,
		stock: 15,
		featured: false,
		description:
			'Commemorative collection featuring classic Yu-Gi-Oh! cards and game board.',
	},
	{
		id: 7,
		title: 'Demon Slayer Nezuko Figure',
		image: 'https://via.placeholder.com/300x300',
		price: 89.99,
		category: 'Action Figures',
		rating: 4.8,
		stock: 9,
		featured: false,
		description: 'Highly detailed Nezuko Kamado figure in running pose.',
	},
	{
		id: 8,
		title: 'Final Fantasy VII Cloud Strife Statue',
		image: 'https://via.placeholder.com/300x300',
		price: 299.99,
		category: 'Statues',
		rating: 4.9,
		stock: 2,
		featured: true,
		description:
			'Limited edition, hand-painted Cloud Strife statue with Buster Sword.',
	},
];

// Collectibles categories
const categories = [
	{ name: 'All', count: collectiblesData.length },
	{
		name: 'Action Figures',
		count: collectiblesData.filter((p) => p.category === 'Action Figures')
			.length,
	},
	{
		name: 'Statues',
		count: collectiblesData.filter((p) => p.category === 'Statues').length,
	},
	{
		name: 'Replicas',
		count: collectiblesData.filter((p) => p.category === 'Replicas').length,
	},
	{
		name: 'Trading Cards',
		count: collectiblesData.filter((p) => p.category === 'Trading Cards')
			.length,
	},
];

export default function CollectiblesPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [filteredProducts, setFilteredProducts] = useState(collectiblesData);
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [sortOption, setSortOption] = useState('featured');

	const featuredItems = collectiblesData.filter((item) => item.featured);

	useEffect(() => {
		let filtered =
			selectedCategory === 'All'
				? collectiblesData
				: collectiblesData.filter((p) => p.category === selectedCategory);

		// Sort the products
		switch (sortOption) {
			case 'price-low':
				filtered = [...filtered].sort((a, b) => a.price - b.price);
				break;
			case 'price-high':
				filtered = [...filtered].sort((a, b) => b.price - a.price);
				break;
			case 'rating':
				filtered = [...filtered].sort((a, b) => b.rating - a.rating);
				break;
			case 'featured':
				filtered = [...filtered].sort(
					(a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
				);
				break;
			default:
				break;
		}

		setFilteredProducts(filtered);
	}, [selectedCategory, sortOption]);

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			{/* Hero section */}
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-bold text-white mb-4'>
					Collectibles & Figures
				</h1>
				<p className='text-gray-400 max-w-3xl mx-auto'>
					Discover premium collectibles, action figures, statues, and rare items
					from your favorite franchises.
				</p>
			</div>

			{/* Featured items carousel */}
			{featuredItems.length > 0 && (
				<div className='mb-16'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold'>Featured Collectibles</h2>
						<Link
							href='/collectibles/featured'
							className='text-purple-500 flex items-center hover:text-purple-400'
						>
							View all <ArrowRight className='h-4 w-4 ml-1' />
						</Link>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
						{featuredItems.map((item) => (
							<div
								key={item.id}
								className='relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group'
							>
								<span className='absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-1 rounded-full z-10'>
									Featured
								</span>
								<img
									src={item.image}
									alt={item.title}
									className='w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105'
								/>
								<div className='p-5'>
									<h3 className='text-lg font-semibold mb-2'>{item.title}</h3>
									<p className='text-gray-400 text-sm mb-3 line-clamp-2'>
										{item.description}
									</p>
									<div className='flex justify-between items-center'>
										<span className='text-xl font-bold'>
											${item.price.toFixed(2)}
										</span>
										<div className='flex space-x-2'>
											<button className='bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors'>
												<ShoppingCart className='h-5 w-5' />
											</button>
											<Link
												href={`/collectibles/${item.id}`}
												className='bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors'
											>
												<ArrowRight className='h-5 w-5' />
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

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
									Under $50
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-2'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-2' className='ml-2'>
									$50 - $100
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-3'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-3' className='ml-2'>
									$100 - $200
								</label>
							</div>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='price-4'
									className='h-4 w-4 text-purple-600 rounded border-gray-600 bg-gray-700 focus:ring-purple-500'
								/>
								<label htmlFor='price-4' className='ml-2'>
									Over $200
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* Product list section */}
				<div className='lg:col-span-3'>
					{/* Mobile filter and sort options */}
					<div className='lg:hidden mb-4'>
						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className='flex items-center bg-gray-800 px-4 py-2 rounded-md w-full mb-2'
						>
							<Filter className='h-5 w-5 mr-2' />
							<span>Filter Products</span>
						</button>

						{isFilterOpen && (
							<div className='bg-gray-800 rounded-lg shadow-lg p-4 mt-2 mb-4'>
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

					{/* Sort options */}
					<div className='flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-6'>
						<p className='text-sm text-gray-400'>
							Showing{' '}
							<span className='text-white'>{filteredProducts.length}</span>{' '}
							collectibles
						</p>
						<div className='flex items-center'>
							<label htmlFor='sort' className='text-sm mr-2'>
								Sort by:
							</label>
							<select
								id='sort'
								value={sortOption}
								onChange={(e) => setSortOption(e.target.value)}
								className='bg-gray-700 border-gray-600 rounded-md text-sm focus:ring-purple-500 focus:border-purple-500'
							>
								<option value='featured'>Featured</option>
								<option value='price-low'>Price: Low to High</option>
								<option value='price-high'>Price: High to Low</option>
								<option value='rating'>Top Rated</option>
							</select>
						</div>
					</div>

					{/* Product grid */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredProducts.map((product) => (
							<div
								key={product.id}
								className='bg-gray-800 rounded-lg shadow-lg overflow-hidden'
							>
								<div className='relative'>
									<img
										src={product.image}
										alt={product.title}
										className='w-full h-64 object-cover'
									/>
									{product.stock < 5 && (
										<span className='absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full'>
											Low Stock
										</span>
									)}
								</div>
								<div className='p-4'>
									<h3 className='text-lg font-semibold mb-2 line-clamp-1'>
										{product.title}
									</h3>
									<div className='flex justify-between items-center mb-2'>
										<span className='text-gray-400'>{product.category}</span>
										<div className='flex items-center'>
											<Star className='h-4 w-4 text-yellow-500 fill-current' />
											<span className='ml-1 text-sm'>{product.rating}</span>
										</div>
									</div>
									<p className='text-sm text-gray-400 mb-3 line-clamp-2'>
										{product.description}
									</p>
									<div className='flex justify-between items-center'>
										<span className='text-xl font-bold'>
											${product.price.toFixed(2)}
										</span>
										<div className='flex space-x-2'>
											<button className='bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors'>
												<ShoppingCart className='h-5 w-5' />
											</button>
											<Link
												href={`/collectibles/${product.id}`}
												className='bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors'
											>
												<ArrowRight className='h-5 w-5' />
											</Link>
										</div>
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
