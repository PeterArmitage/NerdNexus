'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsApi, communityApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { StarIcon } from 'lucide-react';

interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
	stockQuantity: number;
}

interface Review {
	id: number;
	userId: number;
	username: string;
	productId: number;
	rating: number;
	comment: string;
	createdAt: string;
}

export default function ProductDetails({ params }: { params: { id: string } }) {
	const { id } = params;
	const router = useRouter();
	const { isAuthenticated } = useAuth();
	const [product, setProduct] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				setLoading(true);
				setError('');

				// Fetch product details
				const productData = await productsApi.getById(parseInt(id));
				// If productData is null (API error), we'll use the placeholder product
				setProduct(productData);

				// Fetch reviews for this product
				const reviewsData = await communityApi.getReviews(parseInt(id));
				// If reviewsData is empty array (API error), we'll use placeholder reviews
				setReviews(reviewsData || []);
			} catch (err: any) {
				console.error('Error loading product details:', err);
				// Only set error if we really want to show the error UI
				// For now, we'll just let it use the placeholder data
				// setError('Failed to load product details');
			} finally {
				setLoading(false);
			}
		};

		fetchProductDetails();
	}, [id]);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setQuantity(parseInt(e.target.value));
	};

	const handleAddToCart = () => {
		if (!product) return;

		// Get existing cart from localStorage
		const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

		// Check if product already exists in cart
		const existingItemIndex = cartItems.findIndex(
			(item: any) => item.id === product.id
		);

		if (existingItemIndex >= 0) {
			// Update quantity if item already exists
			cartItems[existingItemIndex].quantity += quantity;
		} else {
			// Add new item to cart
			cartItems.push({
				id: product.id,
				name: product.name,
				price: product.price,
				imageUrl: product.imageUrl,
				quantity: quantity,
			});
		}

		// Save updated cart to localStorage
		localStorage.setItem('cart', JSON.stringify(cartItems));

		// Show success message or redirect to cart
		alert('Product added to cart!');
	};

	// Use placeholder product for development
	const placeholderProduct: Product = {
		id: parseInt(id),
		name: 'Final Fantasy XVI',
		description:
			'The latest installment in the legendary RPG series. Experience an epic adventure in a fantasy world filled with powerful summons, intense battles, and an emotional story that follows the journey of Clive Rosfield, the First Shield of Rosaria, dedicating his life to protecting his younger brother—the Dominant of the Phoenix. Dark twists and turns await as Clive uncovers the secrets of the Dominants and the Eikons.',
		price: 59.99,
		category: 'games',
		imageUrl:
			'https://placehold.co/600x400/292a36/f8fafc?text=Final+Fantasy+XVI',
		stockQuantity: 25,
	};

	// Placeholder reviews
	const placeholderReviews: Review[] = [
		{
			id: 1,
			userId: 1,
			username: 'RPGFan',
			productId: parseInt(id),
			rating: 5,
			comment:
				'One of the best games in the series. The combat system is amazing!',
			createdAt: '2023-06-22',
		},
		{
			id: 2,
			userId: 2,
			username: 'GameLover',
			productId: parseInt(id),
			rating: 4,
			comment:
				'Great story and graphics, but some sections feel a bit too linear.',
			createdAt: '2023-06-25',
		},
		{
			id: 3,
			userId: 3,
			username: 'FFVeteran',
			productId: parseInt(id),
			rating: 5,
			comment:
				'The best combat in any Final Fantasy game to date. Highly recommended!',
			createdAt: '2023-07-01',
		},
	];

	// Use placeholder data if API doesn't return anything
	const displayProduct = product || placeholderProduct;
	const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;

	// Calculate average rating
	const averageRating =
		displayReviews.reduce((sum, review) => sum + review.rating, 0) /
		displayReviews.length;

	if (loading) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16'>
				<div className='bg-gray-800 p-6 rounded-md border border-red-500'>
					<h2 className='text-xl font-bold mb-2'>Connection Issue</h2>
					<p className='mb-4'>{error}</p>
					<p className='mb-4'>
						The API server might not be running. We're showing you placeholder
						data instead.
					</p>
					<div className='flex space-x-4'>
						<button
							onClick={() => setError('')} // Clear error and use placeholder data
							className='px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md'
						>
							Show Placeholder Data
						</button>
						<button
							onClick={() => router.push('/products')}
							className='px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md'
						>
							Back to Products
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Product Image */}
				<div className='bg-gray-800 rounded-lg overflow-hidden'>
					<img
						src={displayProduct.imageUrl}
						alt={displayProduct.name}
						className='w-full h-full object-contain'
					/>
				</div>

				{/* Product Info */}
				<div>
					<h1 className='text-3xl font-bold mb-2'>{displayProduct.name}</h1>

					<div className='flex items-center mb-4'>
						<div className='flex mr-2'>
							{[...Array(5)].map((_, i) => (
								<StarIcon
									key={i}
									fill={i < Math.round(averageRating) ? '#9333ea' : 'none'}
									stroke={i < Math.round(averageRating) ? '#9333ea' : '#9ca3af'}
									className='w-5 h-5'
								/>
							))}
						</div>
						<span className='text-gray-400'>
							({displayReviews.length} reviews)
						</span>
					</div>

					<p className='text-3xl font-bold mb-6'>
						${displayProduct.price.toFixed(2)}
					</p>

					<div className='mb-8'>
						<p className='text-gray-300 leading-relaxed'>
							{displayProduct.description}
						</p>
					</div>

					<div className='mb-6'>
						<p className='text-sm text-gray-400 mb-1'>Quantity</p>
						<div className='flex items-center'>
							<select
								value={quantity}
								onChange={handleQuantityChange}
								className='bg-gray-700 border border-gray-600 rounded-md py-2 px-3 mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500'
							>
								{[...Array(10)].map((_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>

							<span className='text-gray-400'>
								{displayProduct.stockQuantity > 0
									? `${displayProduct.stockQuantity} in stock`
									: 'Out of stock'}
							</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							onClick={handleAddToCart}
							disabled={displayProduct.stockQuantity === 0}
							className={`w-full py-3 px-4 rounded-md font-medium text-white ${
								displayProduct.stockQuantity > 0
									? 'bg-purple-600 hover:bg-purple-700'
									: 'bg-gray-600 cursor-not-allowed'
							}`}
						>
							Add to Cart
						</button>

						<button className='w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 rounded-md font-medium text-white border border-gray-600'>
							Add to Wishlist
						</button>
					</div>
				</div>
			</div>

			{/* Reviews Section */}
			<div className='mt-16'>
				<div className='flex justify-between items-center mb-8'>
					<h2 className='text-2xl font-bold'>Customer Reviews</h2>

					{isAuthenticated ? (
						<button className='px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md'>
							Write a Review
						</button>
					) : (
						<button
							onClick={() => router.push('/login')}
							className='px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md'
						>
							Login to Write a Review
						</button>
					)}
				</div>

				<div className='space-y-6'>
					{displayReviews.map((review) => (
						<div key={review.id} className='bg-gray-800 p-6 rounded-lg'>
							<div className='flex justify-between mb-3'>
								<div>
									<h3 className='font-medium'>{review.username}</h3>
									<div className='flex mt-1'>
										{[...Array(5)].map((_, i) => (
											<StarIcon
												key={i}
												fill={i < review.rating ? '#9333ea' : 'none'}
												stroke={i < review.rating ? '#9333ea' : '#9ca3af'}
												className='w-4 h-4'
											/>
										))}
									</div>
								</div>
								<span className='text-gray-400 text-sm'>
									{review.createdAt}
								</span>
							</div>
							<p className='text-gray-300'>{review.comment}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
