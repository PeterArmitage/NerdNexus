'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import SearchBar from '@/app/components/SearchBar/page';
import { Filter, Star, Sliders, ChevronDown, X } from 'lucide-react';

// For now, we'll use mock data
// In a real app, we would fetch this from the API
const allProducts = [
	// Games
	{
		id: 1,
		name: 'Final Fantasy XVI',
		description:
			'The latest installment in the legendary RPG series. Experience an epic adventure in a fantasy world filled with powerful summons.',
		price: 59.99,
		category: 'RPG',
		productType: 'Game',
		imageUrl:
			'https://placehold.co/600x400/292a36/f8fafc?text=Final+Fantasy+XVI',
		rating: 4.8,
		inStock: true,
	},
	{
		id: 2,
		name: 'The Legend of Zelda: Tears of the Kingdom',
		description:
			'Return to Hyrule in this sequel to Breath of the Wild. Explore the skies above and the expanded world below.',
		price: 69.99,
		category: 'Action-Adventure',
		productType: 'Game',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=Zelda+TotK',
		rating: 4.9,
		inStock: true,
	},
	{
		id: 3,
		name: 'God of War Ragnarök',
		description:
			'Embark on a Norse mythological journey as Kratos and Atreus face the coming of Ragnarök.',
		price: 49.99,
		category: 'Action-Adventure',
		productType: 'Game',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=GoW+Ragnarok',
		rating: 4.7,
		inStock: true,
	},
	// Anime
	{
		id: 101,
		name: 'Demon Slayer: Kimetsu no Yaiba - Complete Box Set',
		description:
			'The complete box set of the Demon Slayer anime series, including all seasons and the movie.',
		price: 89.99,
		category: 'Shonen',
		productType: 'Anime',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=Demon+Slayer',
		rating: 4.9,
		inStock: true,
	},
	{
		id: 102,
		name: 'My Hero Academia - Season 5',
		description:
			'The fifth season of the popular superhero anime series My Hero Academia.',
		price: 39.99,
		category: 'Shonen',
		productType: 'Anime',
		imageUrl:
			'https://placehold.co/600x400/292a36/f8fafc?text=My+Hero+Academia',
		rating: 4.5,
		inStock: true,
	},
	// Collectibles
	{
		id: 201,
		name: 'Cloud Strife - Final Fantasy VII Remake Figure',
		description:
			'Highly detailed collectible figure of Cloud Strife from Final Fantasy VII Remake.',
		price: 149.99,
		category: 'Figures',
		productType: 'Collectible',
		imageUrl:
			'https://placehold.co/600x400/292a36/f8fafc?text=Cloud+Strife+Figure',
		rating: 4.7,
		inStock: true,
	},
	{
		id: 202,
		name: 'Link - Breath of the Wild Nendoroid',
		description:
			'Adorable Nendoroid figure of Link from The Legend of Zelda: Breath of the Wild.',
		price: 59.99,
		category: 'Nendoroids',
		productType: 'Collectible',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=Link+Nendoroid',
		rating: 4.6,
		inStock: false,
	},
	{
		id: 203,
		name: 'Geralt of Rivia - The Witcher 3 Statue',
		description:
			'Premium statue of Geralt of Rivia from The Witcher 3: Wild Hunt.',
		price: 249.99,
		category: 'Statues',
		productType: 'Collectible',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=Geralt+Statue',
		rating: 4.9,
		inStock: true,
	},
];

// Define unique product types and categories for filtering
const productTypes = Array.from(
	new Set(allProducts.map((product) => product.productType))
);
const categories = Array.from(
	new Set(allProducts.map((product) => product.category))
);

// Price ranges for filtering
const priceRanges = [
	{ label: 'Under $25', min: 0, max: 25 },
	{ label: '$25 to $50', min: 25, max: 50 },
	{ label: '$50 to $100', min: 50, max: 100 },
	{ label: '$100 to $200', min: 100, max: 200 },
	{ label: 'Over $200', min: 200, max: Infinity },
];

export default function SearchPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get('q') || '';

	const [query, setQuery] = useState(initialQuery);
	const [filteredProducts, setFilteredProducts] = useState(allProducts);
	const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

	// Filter states
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
	const [sortBy, setSortBy] = useState<string>('relevance');
	const [inStockOnly, setInStockOnly] = useState(false);

	// Apply search and filters
	useEffect(() => {
		let results = allProducts;

		// Apply search query
		if (query) {
			results = results.filter(
				(product) =>
					product.name.toLowerCase().includes(query.toLowerCase()) ||
					product.description.toLowerCase().includes(query.toLowerCase()) ||
					product.category.toLowerCase().includes(query.toLowerCase())
			);
		}

		// Apply product type filter
		if (selectedTypes.length > 0) {
			results = results.filter((product) =>
				selectedTypes.includes(product.productType)
			);
		}

		// Apply category filter
		if (selectedCategories.length > 0) {
			results = results.filter((product) =>
				selectedCategories.includes(product.category)
			);
		}

		// Apply price range filter
		if (selectedPriceRanges.length > 0) {
			results = results.filter((product) => {
				return selectedPriceRanges.some((rangeIndex) => {
					const range = priceRanges[rangeIndex];
					return product.price >= range.min && product.price <= range.max;
				});
			});
		}

		// Apply in-stock filter
		if (inStockOnly) {
			results = results.filter((product) => product.inStock);
		}

		// Apply sorting
		switch (sortBy) {
			case 'price-low-high':
				results = [...results].sort((a, b) => a.price - b.price);
				break;
			case 'price-high-low':
				results = [...results].sort((a, b) => b.price - a.price);
				break;
			case 'rating':
				results = [...results].sort((a, b) => b.rating - a.rating);
				break;
			// For 'relevance', keep the order as is (it's the default)
		}

		setFilteredProducts(results);
	}, [
		query,
		selectedTypes,
		selectedCategories,
		selectedPriceRanges,
		inStockOnly,
		sortBy,
	]);

	const handleSearch = (newQuery: string) => {
		setQuery(newQuery);
		// Update URL
		if (newQuery) {
			router.push(`/search?q=${encodeURIComponent(newQuery)}`);
		} else {
			router.push('/search');
		}
	};

	const toggleFilterMenu = () => {
		setIsFilterMenuOpen(!isFilterMenuOpen);
	};

	const toggleType = (type: string) => {
		setSelectedTypes((prev) =>
			prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
		);
	};

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	};

	const togglePriceRange = (index: number) => {
		setSelectedPriceRanges((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	const clearAllFilters = () => {
		setSelectedTypes([]);
		setSelectedCategories([]);
		setSelectedPriceRanges([]);
		setInStockOnly(false);
		setSortBy('relevance');
	};

	const hasActiveFilters = () => {
		return (
			selectedTypes.length > 0 ||
			selectedCategories.length > 0 ||
			selectedPriceRanges.length > 0 ||
			inStockOnly ||
			sortBy !== 'relevance'
		);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='mb-8'>
				<h1 className='text-3xl font-bold mb-4'>
					{query ? `Search Results for "${query}"` : 'All Products'}
				</h1>

				<div className='w-full max-w-2xl'>
					<SearchBar
						initialQuery={query}
						onSearch={handleSearch}
						autoFocus={!query}
					/>
				</div>
			</div>

			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Filters for larger screens */}
				<div className='hidden lg:block w-64 flex-shrink-0'>
					<div className='bg-gray-800 rounded-lg p-6'>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-lg font-semibold'>Filters</h2>
							{hasActiveFilters() && (
								<button
									onClick={clearAllFilters}
									className='text-sm text-purple-400 hover:text-purple-300'
								>
									Clear All
								</button>
							)}
						</div>

						{/* Product Type */}
						<div className='mb-6'>
							<h3 className='font-medium mb-2'>Product Type</h3>
							<div className='space-y-2'>
								{productTypes.map((type) => (
									<label key={type} className='flex items-center'>
										<input
											type='checkbox'
											checked={selectedTypes.includes(type)}
											onChange={() => toggleType(type)}
											className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>{type}</span>
									</label>
								))}
							</div>
						</div>

						{/* Categories */}
						<div className='mb-6'>
							<h3 className='font-medium mb-2'>Category</h3>
							<div className='space-y-2'>
								{categories.map((category) => (
									<label key={category} className='flex items-center'>
										<input
											type='checkbox'
											checked={selectedCategories.includes(category)}
											onChange={() => toggleCategory(category)}
											className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
										/>
										<span>{category}</span>
									</label>
								))}
							</div>
						</div>

						{/* Price Range */}
						<div className='mb-6'>
							<h3 className='font-medium mb-2'>Price</h3>
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

						{/* Availability */}
						<div>
							<h3 className='font-medium mb-2'>Availability</h3>
							<label className='flex items-center'>
								<input
									type='checkbox'
									checked={inStockOnly}
									onChange={(e) => setInStockOnly(e.target.checked)}
									className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
								/>
								<span>In Stock Only</span>
							</label>
						</div>
					</div>
				</div>

				<div className='flex-1'>
					{/* Mobile Controls */}
					<div className='lg:hidden mb-4 flex items-center justify-between'>
						<button
							onClick={toggleFilterMenu}
							className='flex items-center bg-gray-800 px-4 py-2 rounded-md'
						>
							<Filter className='h-4 w-4 mr-2' />
							Filters
							{hasActiveFilters() && (
								<span className='ml-2 bg-purple-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center'>
									{selectedTypes.length +
										selectedCategories.length +
										selectedPriceRanges.length +
										(inStockOnly ? 1 : 0)}
								</span>
							)}
						</button>

						<div className='relative'>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className='appearance-none bg-gray-800 rounded-md px-4 py-2 pr-8'
							>
								<option value='relevance'>Sort by: Relevance</option>
								<option value='price-low-high'>Price: Low to High</option>
								<option value='price-high-low'>Price: High to Low</option>
								<option value='rating'>Top Rated</option>
							</select>
							<ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none' />
						</div>
					</div>

					{/* Mobile Filter Panel */}
					{isFilterMenuOpen && (
						<div className='lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex'>
							<div className='bg-gray-800 w-full max-w-sm mx-auto my-auto rounded-lg overflow-auto max-h-[80vh]'>
								<div className='p-4 border-b border-gray-700 flex justify-between items-center'>
									<h2 className='text-lg font-semibold'>Filters</h2>
									<button
										onClick={toggleFilterMenu}
										className='text-gray-400 hover:text-white'
									>
										<X className='h-5 w-5' />
									</button>
								</div>

								<div className='p-4'>
									{/* Mobile filters (same as desktop) */}
									{/* Product Type */}
									<div className='mb-6'>
										<h3 className='font-medium mb-2'>Product Type</h3>
										<div className='space-y-2'>
											{productTypes.map((type) => (
												<label key={type} className='flex items-center'>
													<input
														type='checkbox'
														checked={selectedTypes.includes(type)}
														onChange={() => toggleType(type)}
														className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
													/>
													<span>{type}</span>
												</label>
											))}
										</div>
									</div>

									{/* Categories */}
									<div className='mb-6'>
										<h3 className='font-medium mb-2'>Category</h3>
										<div className='space-y-2'>
											{categories.map((category) => (
												<label key={category} className='flex items-center'>
													<input
														type='checkbox'
														checked={selectedCategories.includes(category)}
														onChange={() => toggleCategory(category)}
														className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
													/>
													<span>{category}</span>
												</label>
											))}
										</div>
									</div>

									{/* Price Range */}
									<div className='mb-6'>
										<h3 className='font-medium mb-2'>Price</h3>
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

									{/* Availability */}
									<div className='mb-6'>
										<h3 className='font-medium mb-2'>Availability</h3>
										<label className='flex items-center'>
											<input
												type='checkbox'
												checked={inStockOnly}
												onChange={(e) => setInStockOnly(e.target.checked)}
												className='rounded mr-2 h-4 w-4 border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500'
											/>
											<span>In Stock Only</span>
										</label>
									</div>

									{/* Sort By (Mobile) */}
									<div className='mb-6'>
										<h3 className='font-medium mb-2'>Sort By</h3>
										<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value)}
											className='w-full bg-gray-700 rounded-md px-3 py-2'
										>
											<option value='relevance'>Relevance</option>
											<option value='price-low-high'>Price: Low to High</option>
											<option value='price-high-low'>Price: High to Low</option>
											<option value='rating'>Top Rated</option>
										</select>
									</div>
								</div>

								<div className='p-4 border-t border-gray-700 flex justify-between'>
									<button
										onClick={clearAllFilters}
										className='text-gray-400 hover:text-white'
									>
										Clear All
									</button>

									<button
										onClick={toggleFilterMenu}
										className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md'
									>
										Apply Filters
									</button>
								</div>
							</div>
						</div>
					)}

					{/* Sort Controls (Desktop) */}
					<div className='hidden lg:flex justify-end mb-4'>
						<div className='relative'>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className='appearance-none bg-gray-800 rounded-md px-4 py-2 pr-8'
							>
								<option value='relevance'>Sort by: Relevance</option>
								<option value='price-low-high'>Price: Low to High</option>
								<option value='price-high-low'>Price: High to Low</option>
								<option value='rating'>Top Rated</option>
							</select>
							<ChevronDown className='absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none' />
						</div>
					</div>

					{/* Results */}
					{filteredProducts.length === 0 ? (
						<div className='bg-gray-800 rounded-lg p-6 text-center'>
							<h2 className='text-xl font-semibold mb-2'>No products found</h2>
							<p className='text-gray-400 mb-4'>
								Try adjusting your search or filter criteria.
							</p>
							<button
								onClick={clearAllFilters}
								className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md'
							>
								Clear All Filters
							</button>
						</div>
					) : (
						<div>
							<p className='mb-4 text-gray-400'>
								{filteredProducts.length}{' '}
								{filteredProducts.length === 1 ? 'product' : 'products'} found
							</p>

							<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
								{filteredProducts.map((product) => (
									<div
										key={product.id}
										className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'
									>
										<div className='h-48 overflow-hidden'>
											<img
												src={product.imageUrl}
												alt={product.name}
												className='w-full h-full object-cover'
											/>
										</div>
										<div className='p-4'>
											<div className='flex items-center mb-2'>
												<span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
													{product.productType}
												</span>
												<span className='bg-gray-700 text-white text-xs px-2 py-1 rounded-full'>
													{product.category}
												</span>
												<div className='ml-auto flex items-center'>
													<Star className='h-4 w-4 text-yellow-500 fill-current' />
													<span className='ml-1 text-sm'>{product.rating}</span>
												</div>
											</div>
											<h3 className='font-semibold text-lg mb-2'>
												{product.name}
											</h3>
											<p className='text-gray-400 text-sm mb-3 line-clamp-2'>
												{product.description}
											</p>
											<div className='flex justify-between items-center'>
												<span className='text-lg font-bold'>
													${product.price.toFixed(2)}
												</span>
												{product.inStock ? (
													<span className='text-green-500 text-sm'>
														In Stock
													</span>
												) : (
													<span className='text-red-500 text-sm'>
														Out of Stock
													</span>
												)}
											</div>
											<Link
												href={`/products/${product.id}`}
												className='mt-3 block bg-purple-600 hover:bg-purple-700 transition-colors text-center text-white px-4 py-2 rounded-md'
											>
												View Details
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
