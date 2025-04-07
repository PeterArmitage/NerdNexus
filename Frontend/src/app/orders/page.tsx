'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, ChevronRight, Package, Clock } from 'lucide-react';

// Define interfaces for our data
interface OrderItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

interface Order {
	id: string;
	date: string;
	status: string;
	totalAmount: number;
	items: OrderItem[];
}

// For now we'll use mock data
// In a real app, we would fetch this from the API
const mockOrders: Order[] = [
	{
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
	},
	{
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
	},
	{
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
	},
];

// Status badge component
function StatusBadge({ status }: { status: string }) {
	let color;
	let icon;

	switch (status) {
		case 'Delivered':
			color = 'bg-green-600';
			icon = <Package className='h-4 w-4 mr-1' />;
			break;
		case 'Shipped':
			color = 'bg-blue-600';
			icon = <Package className='h-4 w-4 mr-1' />;
			break;
		case 'Processing':
			color = 'bg-yellow-600';
			icon = <Clock className='h-4 w-4 mr-1' />;
			break;
		default:
			color = 'bg-gray-600';
			icon = <Clock className='h-4 w-4 mr-1' />;
	}

	return (
		<span
			className={`flex items-center ${color} text-white px-2 py-1 rounded-full text-xs`}
		>
			{icon}
			{status}
		</span>
	);
}

export default function OrdersPage() {
	const { isAuthenticated } = useAuth();
	const router = useRouter();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is authenticated
		if (!isAuthenticated) {
			router.push('/login?redirect=/orders');
			return;
		}

		// In a real app, we would fetch orders from the API
		// For now, we'll simulate an API call with a timeout
		const fetchOrders = async () => {
			try {
				setLoading(true);
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setOrders(mockOrders);
			} catch (error) {
				console.error('Error fetching orders:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [isAuthenticated, router]);

	if (loading) {
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
			<h1 className='text-3xl font-bold mb-8'>Your Orders</h1>

			{orders.length === 0 ? (
				<div className='text-center py-16'>
					<ShoppingBag className='h-16 w-16 mx-auto text-gray-400 mb-4' />
					<h2 className='text-2xl font-bold mb-4'>No orders yet</h2>
					<p className='text-gray-400 mb-8'>
						You haven't placed any orders yet. Start shopping to place your
						first order!
					</p>
					<Link
						href='/games'
						className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors'
					>
						Browse Games
					</Link>
				</div>
			) : (
				<div className='space-y-6'>
					{orders.map((order) => (
						<div
							key={order.id}
							className='bg-gray-800 rounded-lg overflow-hidden shadow'
						>
							<div className='border-b border-gray-700 p-6'>
								<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
									<div>
										<div className='font-medium text-sm text-gray-400'>
											ORDER #
										</div>
										<div className='font-mono'>{order.id}</div>
									</div>
									<div>
										<div className='font-medium text-sm text-gray-400'>
											DATE
										</div>
										<div>{new Date(order.date).toLocaleDateString()}</div>
									</div>
									<div>
										<div className='font-medium text-sm text-gray-400'>
											STATUS
										</div>
										<StatusBadge status={order.status} />
									</div>
									<div>
										<div className='font-medium text-sm text-gray-400'>
											TOTAL
										</div>
										<div className='font-bold'>
											${order.totalAmount.toFixed(2)}
										</div>
									</div>
									<div>
										<Link
											href={`/orders/${order.id}`}
											className='inline-flex items-center text-purple-500 hover:text-purple-400 transition-colors'
										>
											View Details
											<ChevronRight className='h-4 w-4 ml-1' />
										</Link>
									</div>
								</div>
							</div>

							<div className='px-6 py-4'>
								<div className='font-medium text-sm text-gray-400 mb-4'>
									ORDER ITEMS
								</div>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
									{order.items.map((item) => (
										<div key={item.id} className='flex items-center'>
											<div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md mr-4'>
												<img
													src={item.imageUrl}
													alt={item.name}
													className='h-full w-full object-cover object-center'
												/>
											</div>
											<div>
												<div className='font-medium'>{item.name}</div>
												<div className='text-gray-400 text-sm'>
													{item.quantity} × ${item.price.toFixed(2)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
