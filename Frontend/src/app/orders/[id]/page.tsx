'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
	ArrowLeft,
	Package,
	Truck,
	Clock,
	MapPin,
	Calendar,
	CreditCard,
} from 'lucide-react';

// Order item interface
interface OrderItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

// Order interface
interface Order {
	id: string;
	date: string;
	status: string;
	totalAmount: number;
	items: OrderItem[];
	shippingAddress?: {
		fullName: string;
		address: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
	paymentMethod?: string;
	trackingNumber?: string;
	estimatedDelivery?: string;
}

// Mock data
const mockOrders: Record<string, Order> = {
	'ORD-1681234567-123': {
		id: 'ORD-1681234567-123',
		date: '2023-04-10T08:30:00Z',
		status: 'Delivered',
		totalAmount: 119.98,
		items: [
			{
				id: 1,
				name: 'Final Fantasy XVI',
				price: 59.99,
				quantity: 1,
				imageUrl: 'https://via.placeholder.com/300x400',
			},
			{
				id: 5,
				name: 'Spider-Man 2',
				price: 59.99,
				quantity: 1,
				imageUrl: 'https://via.placeholder.com/300x400',
			},
		],
		shippingAddress: {
			fullName: 'John Doe',
			address: '123 Main St',
			city: 'New York',
			state: 'NY',
			postalCode: '10001',
			country: 'United States',
		},
		paymentMethod: 'Credit Card (ending in 4242)',
		trackingNumber: 'TRK-123456789',
		estimatedDelivery: '2023-04-15T00:00:00Z',
	},
	'ORD-1680123456-456': {
		id: 'ORD-1680123456-456',
		date: '2023-03-29T14:45:00Z',
		status: 'Shipped',
		totalAmount: 49.99,
		items: [
			{
				id: 7,
				name: 'Resident Evil 4 Remake',
				price: 49.99,
				quantity: 1,
				imageUrl: 'https://via.placeholder.com/300x400',
			},
		],
		shippingAddress: {
			fullName: 'John Doe',
			address: '123 Main St',
			city: 'New York',
			state: 'NY',
			postalCode: '10001',
			country: 'United States',
		},
		paymentMethod: 'Credit Card (ending in 4242)',
		trackingNumber: 'TRK-987654321',
		estimatedDelivery: '2023-04-05T00:00:00Z',
	},
	'ORD-1679234567-789': {
		id: 'ORD-1679234567-789',
		date: '2023-03-15T11:20:00Z',
		status: 'Processing',
		totalAmount: 59.99,
		items: [
			{
				id: 8,
				name: 'Starfield',
				price: 59.99,
				quantity: 1,
				imageUrl: 'https://via.placeholder.com/300x400',
			},
		],
		shippingAddress: {
			fullName: 'John Doe',
			address: '123 Main St',
			city: 'New York',
			state: 'NY',
			postalCode: '10001',
			country: 'United States',
		},
		paymentMethod: 'Credit Card (ending in 4242)',
	},
};

// Status badge component
function StatusBadge({ status }: { status: string }) {
	let color;
	let icon;

	switch (status) {
		case 'Delivered':
			color = 'bg-green-600';
			icon = <Package className='h-4 w-4 mr-2' />;
			break;
		case 'Shipped':
			color = 'bg-blue-600';
			icon = <Truck className='h-4 w-4 mr-2' />;
			break;
		case 'Processing':
			color = 'bg-yellow-600';
			icon = <Clock className='h-4 w-4 mr-2' />;
			break;
		default:
			color = 'bg-gray-600';
			icon = <Clock className='h-4 w-4 mr-2' />;
	}

	return (
		<div
			className={`${color} text-white px-4 py-2 rounded-md inline-flex items-center`}
		>
			{icon}
			{status}
		</div>
	);
}

export default function OrderDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const { id } = params;
	const [order, setOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is authenticated
		if (!isAuthenticated) {
			router.push('/login?redirect=/orders/' + id);
			return;
		}

		// In a real app, we would fetch order from the API
		// For now, we'll simulate an API call with a timeout
		const fetchOrder = async () => {
			try {
				setLoading(true);
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1000));

				const foundOrder = mockOrders[id];
				if (foundOrder) {
					setOrder(foundOrder);
				} else {
					// Order not found, redirect to orders page
					router.push('/orders');
				}
			} catch (error) {
				console.error('Error fetching order:', error);
				router.push('/orders');
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [isAuthenticated, router, id]);

	if (loading || !order) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				<div className='flex justify-center my-12'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='mb-8'>
				<Link
					href='/orders'
					className='inline-flex items-center text-purple-500 hover:text-purple-400 transition-colors'
				>
					<ArrowLeft className='h-4 w-4 mr-2' />
					Back to Orders
				</Link>
			</div>

			<div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8'>
				<div>
					<h1 className='text-3xl font-bold mb-2'>Order Details</h1>
					<p className='text-gray-400'>Order #{order.id}</p>
				</div>
				<StatusBadge status={order.status} />
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					{/* Order Items */}
					<div className='bg-gray-800 rounded-lg mb-8'>
						<div className='px-6 py-4 border-b border-gray-700'>
							<h2 className='text-xl font-semibold'>Items in your order</h2>
						</div>
						<div className='p-6'>
							<div className='space-y-6'>
								{order.items.map((item) => (
									<div
										key={item.id}
										className='flex flex-col sm:flex-row bg-gray-700 rounded-lg overflow-hidden'
									>
										<div className='sm:w-1/4 h-40 sm:h-auto'>
											<img
												src={item.imageUrl}
												alt={item.name}
												className='w-full h-full object-cover'
											/>
										</div>
										<div className='p-4 sm:w-3/4 flex flex-col'>
											<h3 className='text-lg font-medium mb-2'>{item.name}</h3>
											<div className='text-gray-400 mb-2'>
												Quantity: {item.quantity}
											</div>
											<div className='text-lg font-bold mt-auto'>
												${(item.price * item.quantity).toFixed(2)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Tracking Info */}
					{order.status !== 'Processing' && (
						<div className='bg-gray-800 rounded-lg mb-8'>
							<div className='px-6 py-4 border-b border-gray-700'>
								<h2 className='text-xl font-semibold'>Shipping Information</h2>
							</div>
							<div className='p-6'>
								{order.trackingNumber && (
									<div className='mb-4'>
										<div className='text-gray-400 mb-1'>Tracking Number</div>
										<div className='font-mono'>{order.trackingNumber}</div>
									</div>
								)}

								{order.estimatedDelivery && (
									<div>
										<div className='text-gray-400 mb-1'>Estimated Delivery</div>
										<div className='flex items-center'>
											<Calendar className='h-4 w-4 mr-2 text-gray-400' />
											{new Date(order.estimatedDelivery).toLocaleDateString(
												undefined,
												{
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												}
											)}
										</div>
									</div>
								)}
							</div>
						</div>
					)}
				</div>

				<div className='lg:col-span-1'>
					{/* Order Summary */}
					<div className='bg-gray-800 rounded-lg mb-8'>
						<div className='px-6 py-4 border-b border-gray-700'>
							<h2 className='text-xl font-semibold'>Order Summary</h2>
						</div>
						<div className='p-6'>
							<div className='flex justify-between mb-2'>
								<span className='text-gray-400'>Order Date</span>
								<span>{new Date(order.date).toLocaleDateString()}</span>
							</div>

							<div className='flex justify-between mb-4'>
								<span className='text-gray-400'>Order Status</span>
								<span className='capitalize'>{order.status}</span>
							</div>

							<div className='border-t border-gray-700 my-4'></div>

							<div className='flex justify-between mb-2'>
								<span className='text-gray-400'>Subtotal</span>
								<span>${order.totalAmount.toFixed(2)}</span>
							</div>

							<div className='flex justify-between mb-2'>
								<span className='text-gray-400'>Shipping</span>
								<span>Free</span>
							</div>

							<div className='flex justify-between mb-2'>
								<span className='text-gray-400'>Tax</span>
								<span>${(order.totalAmount * 0.08).toFixed(2)}</span>
							</div>

							<div className='border-t border-gray-700 my-4'></div>

							<div className='flex justify-between text-lg font-bold'>
								<span>Total</span>
								<span>
									${(order.totalAmount + order.totalAmount * 0.08).toFixed(2)}
								</span>
							</div>
						</div>
					</div>

					{/* Shipping Address */}
					{order.shippingAddress && (
						<div className='bg-gray-800 rounded-lg mb-8'>
							<div className='px-6 py-4 border-b border-gray-700'>
								<h2 className='text-xl font-semibold'>Shipping Address</h2>
							</div>
							<div className='p-6'>
								<div className='flex items-start'>
									<MapPin className='h-5 w-5 mr-2 text-gray-400 mt-0.5' />
									<div>
										<div className='font-medium'>
											{order.shippingAddress.fullName}
										</div>
										<div className='text-gray-400'>
											{order.shippingAddress.address}
										</div>
										<div className='text-gray-400'>
											{order.shippingAddress.city},{' '}
											{order.shippingAddress.state}{' '}
											{order.shippingAddress.postalCode}
										</div>
										<div className='text-gray-400'>
											{order.shippingAddress.country}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Payment Information */}
					{order.paymentMethod && (
						<div className='bg-gray-800 rounded-lg'>
							<div className='px-6 py-4 border-b border-gray-700'>
								<h2 className='text-xl font-semibold'>Payment Information</h2>
							</div>
							<div className='p-6'>
								<div className='flex items-start'>
									<CreditCard className='h-5 w-5 mr-2 text-gray-400 mt-0.5' />
									<div>{order.paymentMethod}</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
