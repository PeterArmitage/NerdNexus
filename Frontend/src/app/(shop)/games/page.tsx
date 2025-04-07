'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Gamepad2,
	Filter,
	Star,
	ArrowRight,
	ShoppingCart,
	Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Placeholder games data
const gamesData = [
	{
		id: 1,
		title: 'Final Fantasy XVI',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'RPG',
		rating: 4.9,
		stock: 15,
		featured: true,
		description: 'The latest installment in the legendary RPG series.',
	},
	{
		id: 2,
		title: 'The Legend of Zelda: Tears of the Kingdom',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'Action-Adventure',
		rating: 4.9,
		stock: 22,
		featured: true,
		description: 'Explore the vast world of Hyrule in this epic adventure.',
	},
	{
		id: 3,
		title: 'God of War Ragnarök',
		image: 'https://via.placeholder.com/300x400',
		price: 49.99,
		category: 'Action',
		rating: 4.8,
		stock: 18,
		featured: false,
		description:
			"Continue Kratos and Atreus's journey through the nine realms.",
	},
	{
		id: 4,
		title: 'Elden Ring',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'RPG',
		rating: 4.9,
		stock: 12,
		featured: false,
		description:
			'Explore the vast world of the Lands Between in this action RPG.',
	},
	{
		id: 5,
		title: 'Spider-Man 2',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'Action',
		rating: 4.8,
		stock: 25,
		featured: true,
		description:
			'Play as both Peter Parker and Miles Morales in this action-packed adventure.',
	},
	{
		id: 6,
		title: "Baldur's Gate 3",
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'RPG',
		rating: 4.9,
		stock: 10,
		featured: false,
		description:
			'A deep and immersive RPG set in the Dungeons & Dragons universe.',
	},
	{
		id: 7,
		title: 'Resident Evil 4 Remake',
		image: 'https://via.placeholder.com/300x400',
		price: 49.99,
		category: 'Survival Horror',
		rating: 4.8,
		stock: 14,
		featured: false,
		description: 'A modern reimagining of the classic survival horror game.',
	},
	{
		id: 8,
		title: 'Starfield',
		image: 'https://via.placeholder.com/300x400',
		price: 59.99,
		category: 'RPG',
		rating: 4.7,
		stock: 20,
		featured: true,
		description: 'Explore the vast universe in this sci-fi RPG from Bethesda.',
	},
];

// Categories with counts
const categories = [
	{ name: 'All', count: gamesData.length },
	{
		name: 'RPG',
		count: gamesData.filter((game) => game.category === 'RPG').length,
	},
	{
		name: 'Action',
		count: gamesData.filter((game) => game.category === 'Action').length,
	},
	{
		name: 'Action-Adventure',
		count: gamesData.filter((game) => game.category === 'Action-Adventure')
			.length,
	},
	{
		name: 'Survival Horror',
		count: gamesData.filter((game) => game.category === 'Survival Horror')
			.length,
	},
];

export default function GamesPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [filteredGames, setFilteredGames] = useState(gamesData);
	const [showFilters, setShowFilters] = useState(false);
	const [addedToCart, setAddedToCart] = useState<number | null>(null);
	const { addItem } = useCart();

	useEffect(() => {
		if (selectedCategory === 'All') {
			setFilteredGames(gamesData);
		} else {
			setFilteredGames(
				gamesData.filter((game) => game.category === selectedCategory)
			);
		}
	}, [selectedCategory]);

	const handleAddToCart = (game: any) => {
		addItem({
			id: game.id,
			name: game.title,
			price: game.price,
			quantity: 1,
			imageUrl: game.image,
		});
		setAddedToCart(game.id);
		setTimeout(() => setAddedToCart(null), 2000);
	};

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
				<div>
					<h1 className='text-3xl font-bold mb-2'>Games</h1>
					<p className='text-gray-400'>
						Discover the latest and greatest video games for all platforms
					</p>
				</div>
				<div className='mt-4 md:mt-0'>
					<button
						onClick={() => setShowFilters(!showFilters)}
						className='flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
					>
						<Filter className='h-4 w-4 mr-2' />
						Filters
					</button>
				</div>
			</div>

			{/* Desktop filter sidebar */}
			<div className='hidden md:block w-64 float-left mr-8 mb-8'>
				<div className='bg-gray-800 rounded-lg p-4'>
					<h2 className='text-lg font-semibold mb-4'>Categories</h2>
					<div className='space-y-2'>
						{categories.map((category) => (
							<button
								key={category.name}
								onClick={() => setSelectedCategory(category.name)}
								className={`flex justify-between items-center w-full px-3 py-2 rounded-md transition-colors ${
									selectedCategory === category.name
										? 'bg-purple-600 text-white'
										: 'hover:bg-gray-700'
								}`}
							>
								<span>{category.name}</span>
								<span className='bg-gray-700 px-2 py-1 rounded-full text-xs'>
									{category.count}
								</span>
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Mobile filter button */}
			<div className='md:hidden mb-6'>
				<button
					onClick={() => setShowFilters(!showFilters)}
					className='flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
				>
					<Filter className='h-4 w-4 mr-2' />
					{showFilters ? 'Hide Filters' : 'Show Filters'}
				</button>
			</div>

			{/* Mobile filter panel */}
			{showFilters && (
				<div className='md:hidden bg-gray-800 rounded-lg p-4 mb-6'>
					<h2 className='text-lg font-semibold mb-4'>Categories</h2>
					<div className='space-y-2'>
						{categories.map((category) => (
							<button
								key={category.name}
								onClick={() => {
									setSelectedCategory(category.name);
									setShowFilters(false);
								}}
								className={`flex justify-between items-center w-full px-3 py-2 rounded-md transition-colors ${
									selectedCategory === category.name
										? 'bg-purple-600 text-white'
										: 'hover:bg-gray-700'
								}`}
							>
								<span>{category.name}</span>
								<span className='bg-gray-700 px-2 py-1 rounded-full text-xs'>
									{category.count}
								</span>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Featured games section */}
			{selectedCategory === 'All' && (
				<div className='mb-12'>
					<h2 className='text-2xl font-bold mb-6'>Featured Games</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						{filteredGames
							.filter((game) => game.featured)
							.map((game) => (
								<div
									key={game.id}
									className='bg-gray-800 rounded-lg overflow-hidden shadow-lg'
								>
									<div className='flex flex-col md:flex-row'>
										<div className='md:w-1/3'>
											<img
												src={game.image}
												alt={game.title}
												className='w-full h-48 md:h-full object-cover'
											/>
										</div>
										<div className='p-6 md:w-2/3'>
											<div className='flex items-center mb-2'>
												<span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
													{game.category}
												</span>
												<div className='flex items-center'>
													<Star className='h-4 w-4 text-yellow-500 fill-current' />
													<span className='ml-1 text-sm'>{game.rating}</span>
												</div>
											</div>
											<h3 className='text-xl font-bold mb-2'>{game.title}</h3>
											<p className='text-gray-400 mb-4 line-clamp-2'>
												{game.description}
											</p>
											<div className='flex justify-between items-center'>
												<span className='text-xl font-bold'>
													${game.price.toFixed(2)}
												</span>
												<div className='flex space-x-2'>
													<button
														onClick={() => handleAddToCart(game)}
														className={`p-2 rounded-md transition-colors ${
															addedToCart === game.id
																? 'bg-green-600 hover:bg-green-700'
																: 'bg-purple-600 hover:bg-purple-700'
														}`}
														title={
															addedToCart === game.id
																? 'Added to Cart'
																: 'Add to Cart'
														}
													>
														{addedToCart === game.id ? (
															<Check className='h-4 w-4' />
														) : (
															<ShoppingCart className='h-4 w-4' />
														)}
													</button>
													<Link
														href={`/products/${game.id}`}
														className='flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
													>
														Details
														<ArrowRight className='h-4 w-4 ml-2' />
													</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			)}

			{/* All games grid */}
			<div className='md:ml-72'>
				<h2 className='text-2xl font-bold mb-6'>
					{selectedCategory === 'All'
						? 'All Games'
						: `${selectedCategory} Games`}
				</h2>
				{filteredGames.length > 0 ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
						{filteredGames.map((game) => (
							<div
								key={game.id}
								className='bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105'
							>
								<div className='h-48 overflow-hidden'>
									<img
										src={game.image}
										alt={game.title}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='p-4'>
									<div className='flex items-center mb-2'>
										<span className='bg-purple-600 text-white text-xs px-2 py-1 rounded-full mr-2'>
											{game.category}
										</span>
										<div className='flex items-center'>
											<Star className='h-4 w-4 text-yellow-500 fill-current' />
											<span className='ml-1 text-sm'>{game.rating}</span>
										</div>
									</div>
									<h3 className='font-semibold text-lg mb-2'>{game.title}</h3>
									<p className='text-gray-400 text-sm mb-3 line-clamp-2'>
										{game.description}
									</p>
									<div className='flex justify-between items-center'>
										<span className='text-lg font-bold'>
											${game.price.toFixed(2)}
										</span>
										<div className='flex space-x-2'>
											<button
												onClick={() => handleAddToCart(game)}
												className={`p-2 rounded-md transition-colors ${
													addedToCart === game.id
														? 'bg-green-600 hover:bg-green-700'
														: 'bg-purple-600 hover:bg-purple-700'
												}`}
												title={
													addedToCart === game.id
														? 'Added to Cart'
														: 'Add to Cart'
												}
											>
												{addedToCart === game.id ? (
													<Check className='h-4 w-4' />
												) : (
													<ShoppingCart className='h-4 w-4' />
												)}
											</button>
											<Link
												href={`/products/${game.id}`}
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
				) : (
					<div className='text-center py-12'>
						<p className='text-gray-400'>No games found in this category.</p>
					</div>
				)}
			</div>
		</div>
	);
}
