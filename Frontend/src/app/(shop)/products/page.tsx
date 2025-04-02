'use client';

import { useEffect, useState } from 'react';
import { productsApi } from '@/services/api';
import Link from 'next/link';

interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
}

export default function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError('');
				let data;

				if (selectedCategory === 'all') {
					data = await productsApi.getAll();
				} else {
					data = await productsApi.getByCategory(selectedCategory);
				}

				// The API will return an empty array if there's a connection error
				setProducts(data || []);
			} catch (err: any) {
				console.error('Error loading products:', err);
				setError('Failed to load products. Using placeholder data instead.');
				// We'll fall back to placeholder products
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [selectedCategory]);

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
	};

	// Placeholder products if API call fails or during development
	const placeholderProducts: Product[] = [
		{
			id: 1,
			name: 'Final Fantasy XVI',
			description: 'The latest installment in the legendary RPG series',
			price: 59.99,
			category: 'games',
			imageUrl:
				'https://placehold.co/300x400/292a36/f8fafc?text=Final+Fantasy+XVI',
		},
		{
			id: 2,
			name: 'Demon Slayer: Season 1 Blu-ray',
			description: 'The complete first season of the hit anime series',
			price: 34.99,
			category: 'anime',
			imageUrl: 'https://placehold.co/300x400/292a36/f8fafc?text=Demon+Slayer',
		},
		{
			id: 3,
			name: 'Nintendo Switch OLED',
			description: 'The latest Nintendo Switch with a vibrant OLED screen',
			price: 349.99,
			category: 'games',
			imageUrl:
				'https://placehold.co/300x400/292a36/f8fafc?text=Nintendo+Switch',
		},
		{
			id: 4,
			name: 'Attack on Titan Manga Box Set',
			description: 'The complete manga collection',
			price: 129.99,
			category: 'anime',
			imageUrl:
				'https://placehold.co/300x400/292a36/f8fafc?text=Attack+on+Titan',
		},
		{
			id: 5,
			name: 'Goku Action Figure',
			description: 'Limited edition collectible figure',
			price: 79.99,
			category: 'collectibles',
			imageUrl: 'https://placehold.co/300x400/292a36/f8fafc?text=Goku+Figure',
		},
		{
			id: 6,
			name: 'Playstation 5',
			description: 'Next-generation gaming console',
			price: 499.99,
			category: 'games',
			imageUrl: 'https://placehold.co/300x400/292a36/f8fafc?text=Playstation+5',
		},
	];

	// Use placeholder products for now until backend is fully implemented
	const displayProducts = products.length > 0 ? products : placeholderProducts;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<h1 className='text-3xl font-bold mb-8'>Products</h1>

			{/* Category filters */}
			<div className='mb-8'>
				<div className='flex flex-wrap gap-2'>
					<button
						onClick={() => handleCategoryChange('all')}
						className={`px-4 py-2 rounded-full transition-colors ${
							selectedCategory === 'all'
								? 'bg-purple-600'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
					>
						All
					</button>
					<button
						onClick={() => handleCategoryChange('games')}
						className={`px-4 py-2 rounded-full transition-colors ${
							selectedCategory === 'games'
								? 'bg-purple-600'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
					>
						Games
					</button>
					<button
						onClick={() => handleCategoryChange('anime')}
						className={`px-4 py-2 rounded-full transition-colors ${
							selectedCategory === 'anime'
								? 'bg-purple-600'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
					>
						Anime
					</button>
					<button
						onClick={() => handleCategoryChange('collectibles')}
						className={`px-4 py-2 rounded-full transition-colors ${
							selectedCategory === 'collectibles'
								? 'bg-purple-600'
								: 'bg-gray-700 hover:bg-gray-600'
						}`}
					>
						Collectibles
					</button>
				</div>
			</div>

			{loading ? (
				<div className='flex justify-center my-12'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			) : error ? (
				<div className='bg-red-900 text-white p-4 rounded-md mb-6'>{error}</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{displayProducts.map((product) => (
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
								<h3 className='font-semibold text-lg mb-2'>{product.name}</h3>
								<p className='text-gray-400 text-sm mb-3 line-clamp-2'>
									{product.description}
								</p>
								<div className='flex justify-between items-center'>
									<span className='text-lg font-bold'>
										${product.price.toFixed(2)}
									</span>
									<Link
										href={`/products/${product.id}`}
										className='bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded-md text-sm'
									>
										View Details
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
