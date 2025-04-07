'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsApi, communityApi } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { StarIcon, ShoppingCart, Check } from 'lucide-react';

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
	const { addItem } = useCart();
	const [product, setProduct] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [addedToCart, setAddedToCart] = useState(false);

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
				try {
					const reviewsData = await communityApi.getReviews(parseInt(id));
					setReviews(reviewsData || []);
				} catch (reviewError) {
					console.error('Error loading reviews:', reviewError);
					// We'll use placeholder reviews if the API call fails
				}
			} catch (err: any) {
				console.error('Error loading product details:', err);
				setError(
					'Failed to load product details. Using placeholder data instead.'
				);
				// We'll use placeholder data if the API call fails
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

		addItem({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity: quantity,
			imageUrl: product.imageUrl,
		});

		setAddedToCart(true);
		setTimeout(() => setAddedToCart(false), 2000);
	};

	// Placeholder product if API call fails or during development
	const placeholderProduct: Product = {
		id: parseInt(id),
		name: 'Product ' + id,
		description:
			'This is a placeholder product description. The actual product details could not be loaded from the server.',
		price: 49.99,
		category: 'games',
		imageUrl: 'https://placehold.co/600x400/292a36/f8fafc?text=Product+' + id,
		stockQuantity: 10,
	};

	// Placeholder reviews if API call fails or during development
	const placeholderReviews: Review[] = [
		{
			id: 1,
			userId: 1,
			username: 'User1',
			productId: parseInt(id),
			rating: 4,
			comment: 'Great product! Highly recommended.',
			createdAt: '2023-01-15T12:00:00Z',
		},
		{
			id: 2,
			userId: 2,
			username: 'User2',
			productId: parseInt(id),
			rating: 5,
			comment: 'Exactly what I was looking for. Fast shipping too!',
			createdAt: '2023-02-20T14:30:00Z',
		},
		{
			id: 3,
			userId: 3,
			username: 'User3',
			productId: parseInt(id),
			rating: 3,
			comment: 'Good product but a bit expensive for what it offers.',
			createdAt: '2023-03-10T09:15:00Z',
		},
	];

	// Use placeholder data if API call failed or during development
	const displayProduct = product || placeholderProduct;
	const displayReviews = reviews.length > 0 ? reviews : placeholderReviews;

	// Calculate average rating
	const averageRating =
		displayReviews.reduce((sum, review) => sum + review.rating, 0) /
		displayReviews.length;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			{loading ? (
				<div className='flex justify-center my-12'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			) : error ? (
				<div className='bg-red-900 text-white p-4 rounded-md mb-6'>
					<h2 className='text-xl font-bold mb-2'>Connection Issue</h2>
					<p className='mb-4'>
						{error} The API server might not be running or there might be
						network issues.
					</p>
					<div className='flex space-x-4'>
						<button
							onClick={() => setError('')}
							className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors'
						>
							Show Placeholder Data
						</button>
						<button
							onClick={() => router.push('/products')}
							className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors'
						>
							Back to Products
						</button>
					</div>
				</div>
			) : (
				<>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
						<div className='bg-gray-800 rounded-lg overflow-hidden'>
							<img
								src={displayProduct.imageUrl}
								alt={displayProduct.name}
								className='w-full h-auto'
							/>
						</div>
						<div>
							<h1 className='text-3xl font-bold mb-2'>{displayProduct.name}</h1>
							<div className='flex items-center mb-4'>
								<div className='flex'>
									{[1, 2, 3, 4, 5].map((star) => (
										<StarIcon
											key={star}
											className={`h-5 w-5 ${
												star <= averageRating
													? 'text-yellow-500 fill-current'
													: 'text-gray-400'
											}`}
										/>
									))}
								</div>
								<span className='ml-2 text-gray-400'>
									({displayReviews.length} reviews)
								</span>
							</div>
							<p className='text-gray-400 mb-6'>{displayProduct.description}</p>
							<div className='flex items-center mb-6'>
								<span className='text-3xl font-bold mr-4'>
									${displayProduct.price.toFixed(2)}
								</span>
								<span className='text-gray-400'>
									{displayProduct.stockQuantity > 0
										? `${displayProduct.stockQuantity} in stock`
										: 'Out of stock'}
								</span>
							</div>
							<div className='flex items-center mb-6'>
								<label htmlFor='quantity' className='mr-4'>
									Quantity:
								</label>
								<select
									id='quantity'
									value={quantity}
									onChange={handleQuantityChange}
									className='bg-gray-700 border border-gray-600 rounded-md px-3 py-2'
									disabled={displayProduct.stockQuantity <= 0}
								>
									{[...Array(Math.min(10, displayProduct.stockQuantity))].map(
										(_, i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										)
									)}
								</select>
							</div>
							<button
								onClick={handleAddToCart}
								disabled={displayProduct.stockQuantity <= 0}
								className={`w-full py-3 rounded-md transition-colors flex items-center justify-center ${
									addedToCart
										? 'bg-green-600 hover:bg-green-700'
										: 'bg-purple-600 hover:bg-purple-700'
								} ${
									displayProduct.stockQuantity <= 0
										? 'opacity-50 cursor-not-allowed'
										: ''
								}`}
							>
								{addedToCart ? (
									<>
										<Check className='h-5 w-5 mr-2' />
										Added to Cart
									</>
								) : (
									<>
										<ShoppingCart className='h-5 w-5 mr-2' />
										Add to Cart
									</>
								)}
							</button>
						</div>
					</div>

					<div className='mb-12'>
						<h2 className='text-2xl font-bold mb-6'>Product Reviews</h2>
						{displayReviews.length > 0 ? (
							<div className='space-y-6'>
								{displayReviews.map((review) => (
									<div key={review.id} className='bg-gray-800 rounded-lg p-6'>
										<div className='flex justify-between items-start mb-4'>
											<div>
												<div className='font-medium'>{review.username}</div>
												<div className='text-sm text-gray-400'>
													{new Date(review.createdAt).toLocaleDateString()}
												</div>
											</div>
											<div className='flex'>
												{[1, 2, 3, 4, 5].map((star) => (
													<StarIcon
														key={star}
														className={`h-4 w-4 ${
															star <= review.rating
																? 'text-yellow-500 fill-current'
																: 'text-gray-400'
														}`}
													/>
												))}
											</div>
										</div>
										<p className='text-gray-300'>{review.comment}</p>
									</div>
								))}
							</div>
						) : (
							<p className='text-gray-400'>No reviews yet for this product.</p>
						)}
					</div>
				</>
			)}
		</div>
	);
}
