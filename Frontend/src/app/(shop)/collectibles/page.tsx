'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Trophy,
	Filter,
	Star,
	ArrowRight,
	ShoppingCart,
	Check,
	X,
	ChevronDown,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SearchBar from '@/app/components/SearchBar/page';

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

// Extract unique categories for filtering
const categories = Array.from(
	new Set(collectiblesData.map((item) => item.category))
);

// Price ranges for filtering
const priceRanges = [
	{ label: 'Under $25', min: 0, max: 25 },
	{ label: '$25 to $50', min: 25, max: 50 },
	{ label: '$50 to $100', min: 50, max: 100 },
	{ label: 'Over $100', min: 100, max: Infinity },
];

export default function CollectiblesPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [filteredCollectibles, setFilteredCollectibles] =
		useState(collectiblesData);
	const [showFilters, setShowFilters] = useState(false);
	const [addedToCart, setAddedToCart] = useState<number | null>(null);
	const { addItem } = useCart();

	// New state for advanced filtering
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
	const [sortBy, setSortBy] = useState('featured');
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

	useEffect(() => {
		let result = [...collectiblesData];

		// Apply search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.description.toLowerCase().includes(query)
			);
		}

		// Apply category filter
		if (selectedCategory !== 'All') {
			result = result.filter((item) => item.category === selectedCategory);
		}

		// Apply price range filter
		if (selectedPriceRanges.length > 0) {
			result = result.filter((item) => {
				return selectedPriceRanges.some((rangeIndex) => {
					const range = priceRanges[rangeIndex];
					return item.price >= range.min && item.price <= range.max;
				});
			});
		}

		// Apply sorting
		switch (sortBy) {
			case 'price-low-high':
				result.sort((a, b) => a.price - b.price);
				break;
			case 'price-high-low':
				result.sort((a, b) => b.price - a.price);
				break;
			case 'rating':
				result.sort((a, b) => b.rating - a.rating);
				break;
			case 'alphabetical':
				result.sort((a, b) => a.title.localeCompare(b.title));
				break;
			// For 'featured', keep original order (no sort)
		}

		setFilteredCollectibles(result);
	}, [selectedCategory, searchQuery, selectedPriceRanges, sortBy]);

	const handleAddToCart = (item: any) => {
		addItem({
			id: item.id,
			name: item.title,
			price: item.price,
			quantity: 1,
			imageUrl: item.image,
		});
		setAddedToCart(item.id);
		setTimeout(() => setAddedToCart(null), 2000);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const togglePriceRange = (index: number) => {
		setSelectedPriceRanges((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const clearFilters = () => {
		setSelectedCategory('All');
		setSearchQuery('');
		setSelectedPriceRanges([]);
		setSortBy('featured');
	};

	const hasActiveFilters = () => {
		return (
			selectedCategory !== 'All' ||
			searchQuery.trim() !== '' ||
			selectedPriceRanges.length > 0 ||
			sortBy !== 'featured'
		);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			{/* Header */}
			<div className='flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8'>
				<div>
					<h1 className='text-4xl font-bold mb-2 flex items-center'>
						<Trophy className='h-8 w-8 mr-2 text-purple-500' />
						Collectibles
					</h1>
					<p className='text-gray-400 max-w-3xl'>
						Discover premium figurines, limited edition items, and must-have
						collectibles for gaming and anime enthusiasts.
					</p>
				</div>

				<div className='mt-4 lg:mt-0 w-full lg:w-auto'>
					<SearchBar
						placeholder='Search collectibles...'
						initialQuery={searchQuery}
						onSearch={handleSearch}
						className='w-full lg:w-64'
					/>
				</div>
			</div>

			{/* Filters and Sorting */}
			<div className='mb-8'>
				<div className='flex flex-wrap justify-between items-center'>
					{/* Category Filters */}
					<div className='flex overflow-x-auto pb-2 mb-4 lg:mb-0 space-x-2'>
						<button
							onClick={() => setSelectedCategory('All')}
							className={`px-4 py-2 rounded-full whitespace-nowrap ${
								selectedCategory === 'All'
									? 'bg-purple-600 text-white'
									: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
							}`}
						>
							All Collectibles
						</button>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-full whitespace-nowrap ${
									selectedCategory === category
										? 'bg-purple-600 text-white'
										: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
								}`}
							>
								{category}
							</button>
						))}
					</div>

					{/* Filter and Sort Controls */}
					<div className='flex items-center space-x-3'>
						<button
							onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
							className='flex items-center bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700'
						>
							<Filter className='h-4 w-4 mr-2' />
							Filters
							{hasActiveFilters() && (
								<span className='ml-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
									{(selectedCategory !== 'All' ? 1 : 0) +
										(searchQuery.trim() !== '' ? 1 : 0) +
										selectedPriceRanges.length}
								</span>
							)}
						</button>

						<div className='relative'>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className='appearance-none bg-gray-800 rounded-md px-4 py-2 pr-8'
							>
								<option value='featured'>Sort: Featured</option>
								<option value='price-low-high'>Price: Low to High</option>
								<option value='price-high-low'>Price: High to Low</option>
								<option value='rating'>Top Rated</option>
								<option value='alphabetical'>A-Z</option>
							</select>
							<ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none' />
						</div>
					</div>
				</div>

				{/* Active Filters */}
				{hasActiveFilters() && (
					<div className='mt-4 flex items-center flex-wrap'>
						<span className='text-sm text-gray-400 mr-2'>Active Filters:</span>

						{selectedCategory !== 'All' && (
							<span className='bg-gray-800 text-sm rounded-full px-3 py-1 flex items-center mr-2 mb-2'>
								Category: {selectedCategory}
								<button
									onClick={() => setSelectedCategory('All')}
									className='ml-2 text-gray-400 hover:text-white'
								>
									<X className='h-3 w-3' />
								</button>
							</span>
						)}

						{searchQuery.trim() !== '' && (
							<span className='bg-gray-800 text-sm rounded-full px-3 py-1 flex items-center mr-2 mb-2'>
								Search: "{searchQuery}"
								<button
									onClick={() => setSearchQuery('')}
									className='ml-2 text-gray-400 hover:text-white'
								>
									<X className='h-3 w-3' />
								</button>
							</span>
						)}

						{selectedPriceRanges.map((rangeIndex) => (
							<span
								key={rangeIndex}
								className='bg-gray-800 text-sm rounded-full px-3 py-1 flex items-center mr-2 mb-2'
							>
								{priceRanges[rangeIndex].label}
								<button
									onClick={() => togglePriceRange(rangeIndex)}
									className='ml-2 text-gray-400 hover:text-white'
								>
									<X className='h-3 w-3' />
								</button>
							</span>
						))}

						<button
							onClick={clearFilters}
							className='text-purple-500 hover:text-purple-400 text-sm ml-2'
						>
							Clear All
						</button>
					</div>
				)}

				{/* Advanced Filters Panel */}
				{isFilterMenuOpen && (
					<div className='mt-4 bg-gray-800 rounded-lg p-4'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='font-medium'>Advanced Filters</h3>
							<button
								onClick={() => setIsFilterMenuOpen(false)}
								className='text-gray-400 hover:text-white'
							>
								<X className='h-5 w-5' />
							</button>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							{/* Price Range */}
							<div>
								<h4 className='text-sm font-medium mb-2'>Price Range</h4>
								<div className='space-y-2'>
									{priceRanges.map((range, index) => (
										<label key={index} className='flex items-center'>
											<input
												type='checkbox'
												checked={selectedPriceRanges.includes(index)}
												onChange={() => togglePriceRange(index)}
												className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
											/>
											<span>{range.label}</span>
										</label>
									))}
								</div>
							</div>

							{/* Rating */}
							<div>
								<h4 className='text-sm font-medium mb-2'>Sort By</h4>
								<div className='space-y-2'>
									<label className='flex items-center'>
										<input
											type='radio'
											checked={sortBy === 'featured'}
											onChange={() => setSortBy('featured')}
											className='rounded-full mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>Featured</span>
									</label>
									<label className='flex items-center'>
										<input
											type='radio'
											checked={sortBy === 'price-low-high'}
											onChange={() => setSortBy('price-low-high')}
											className='rounded-full mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>Price: Low to High</span>
									</label>
									<label className='flex items-center'>
										<input
											type='radio'
											checked={sortBy === 'price-high-low'}
											onChange={() => setSortBy('price-high-low')}
											className='rounded-full mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>Price: High to Low</span>
									</label>
									<label className='flex items-center'>
										<input
											type='radio'
											checked={sortBy === 'rating'}
											onChange={() => setSortBy('rating')}
											className='rounded-full mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>Top Rated</span>
									</label>
									<label className='flex items-center'>
										<input
											type='radio'
											checked={sortBy === 'alphabetical'}
											onChange={() => setSortBy('alphabetical')}
											className='rounded-full mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>Alphabetical (A-Z)</span>
									</label>
								</div>
							</div>
						</div>

						<div className='mt-4 flex justify-end'>
							<button
								onClick={() => {
									clearFilters();
									setIsFilterMenuOpen(false);
								}}
								className='text-gray-300 hover:text-white mr-3'
							>
								Reset
							</button>
							<button
								onClick={() => setIsFilterMenuOpen(false)}
								className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md'
							>
								Apply Filters
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Featured Collectibles */}
			{!hasActiveFilters() && (
				<div className='mb-12'>
					<h2 className='text-2xl font-bold mb-6'>Featured Collectibles</h2>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						{collectiblesData
							.filter((item) => item.featured)
							.map((item) => (
								<div
									key={item.id}
									className='bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row'
								>
									<div className='md:w-2/5 h-56 md:h-auto'>
										<img
											src={item.image}
											alt={item.title}
											className='w-full h-full object-cover'
										/>
									</div>
									<div className='md:w-3/5 p-6 flex flex-col'>
										<div className='flex items-center mb-2'>
											<span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
												{item.category}
											</span>
											<div className='flex items-center ml-auto'>
												<Star className='h-4 w-4 text-yellow-500 fill-current' />
												<span className='ml-1 text-sm'>{item.rating}</span>
											</div>
										</div>
										<h3 className='text-xl font-bold mb-2'>{item.title}</h3>
										<p className='text-gray-400 mb-4 line-clamp-2'>
											{item.description}
										</p>
										<div className='flex justify-between items-center mt-auto'>
											<span className='text-xl font-bold'>
												${item.price.toFixed(2)}
											</span>
											<div className='flex space-x-2'>
												<button
													onClick={() => handleAddToCart(item)}
													className={`p-2 rounded-md transition-colors ${
														addedToCart === item.id
															? 'bg-green-600 hover:bg-green-700'
															: 'bg-purple-600 hover:bg-purple-700'
													}`}
													title={
														addedToCart === item.id
															? 'Added to Cart'
															: 'Add to Cart'
													}
												>
													{addedToCart === item.id ? (
														<Check className='h-4 w-4' />
													) : (
														<ShoppingCart className='h-4 w-4' />
													)}
												</button>
												<Link
													href={`/products/${item.id}`}
													className='flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
												>
													Details
													<ArrowRight className='h-4 w-4 ml-2' />
												</Link>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}

			{/* All Collectibles */}
			<div>
				<h2 className='text-2xl font-bold mb-6'>
					{hasActiveFilters() ? 'Search Results' : 'All Collectibles'}
					{filteredCollectibles.length > 0 && (
						<span className='ml-2 text-sm font-normal text-gray-400'>
							({filteredCollectibles.length}{' '}
							{filteredCollectibles.length === 1 ? 'item' : 'items'})
						</span>
					)}
				</h2>

				{filteredCollectibles.length === 0 ? (
					<div className='bg-gray-800 rounded-lg p-8 text-center'>
						<h3 className='text-xl font-semibold mb-4'>
							No collectibles found
						</h3>
						<p className='text-gray-400 mb-6'>
							We couldn't find any collectibles matching your search criteria.
						</p>
						<button
							onClick={clearFilters}
							className='bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-md'
						>
							Clear Filters
						</button>
					</div>
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredCollectibles.map((item) => (
							<div
								key={item.id}
								className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'
							>
								<div className='h-48 overflow-hidden'>
									<img
										src={item.image}
										alt={item.title}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='p-4'>
									<div className='flex items-center mb-2'>
										<span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
											{item.category}
										</span>
										<div className='flex items-center'>
											<Star className='h-4 w-4 text-yellow-500 fill-current' />
											<span className='ml-1 text-sm'>{item.rating}</span>
										</div>
									</div>
									<h3 className='font-semibold text-lg mb-2'>{item.title}</h3>
									<p className='text-gray-400 text-sm mb-3 line-clamp-2'>
										{item.description}
									</p>
									<div className='flex justify-between items-center'>
										<span className='text-lg font-bold'>
											${item.price.toFixed(2)}
										</span>
										<div className='flex space-x-2'>
											<button
												onClick={() => handleAddToCart(item)}
												className={`p-2 rounded-md transition-colors ${
													addedToCart === item.id
														? 'bg-green-600 hover:bg-green-700'
														: 'bg-purple-600 hover:bg-purple-700'
												}`}
												title={
													addedToCart === item.id
														? 'Added to Cart'
														: 'Add to Cart'
												}
											>
												{addedToCart === item.id ? (
													<Check className='h-4 w-4' />
												) : (
													<ShoppingCart className='h-4 w-4' />
												)}
											</button>
											<Link
												href={`/products/${item.id}`}
												className='flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
											>
												Details
												<ArrowRight className='h-4 w-4 ml-2' />
											</Link>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
