'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
	const { items, removeItem, updateQuantity, totalItems, totalPrice } =
		useCart();
	const [isUpdating, setIsUpdating] = useState(false);
	const router = useRouter();

	const handleQuantityChange = (id: number, newQuantity: number) => {
		setIsUpdating(true);
		updateQuantity(id, newQuantity);
		setTimeout(() => setIsUpdating(false), 300);
	};

	if (items.length === 0) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				<div className='text-center py-16'>
					<ShoppingCart className='h-16 w-16 mx-auto text-gray-400 mb-4' />
					<h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
					<p className='text-gray-400 mb-8'>
						Looks like you haven't added any items to your cart yet.
					</p>
					<Link
						href='/games'
						className='inline-flex items-center bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<h1 className='text-3xl font-bold mb-8'>Shopping Cart</h1>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				<div className='lg:col-span-2'>
					<div className='bg-gray-800 rounded-lg overflow-hidden'>
						<div className='overflow-x-auto'>
							<table className='min-w-full divide-y divide-gray-700'>
								<thead className='bg-gray-700'>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
										>
											Product
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
										>
											Price
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
										>
											Quantity
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
										>
											Total
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider'
										>
											Action
										</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-gray-700'>
									{items.map((item) => (
										<tr
											key={item.id}
											className='hover:bg-gray-700 transition-colors'
										>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
														<img
															src={item.imageUrl}
															alt={item.name}
															className='h-full w-full object-cover object-center'
														/>
													</div>
													<div className='ml-4'>
														<div className='font-medium'>{item.name}</div>
													</div>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												${item.price.toFixed(2)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='flex items-center'>
													<button
														onClick={() =>
															handleQuantityChange(item.id, item.quantity - 1)
														}
														disabled={isUpdating || item.quantity <= 1}
														className='bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed p-1 rounded-l-md transition-colors'
													>
														-
													</button>
													<span className='px-3 py-1 bg-gray-700'>
														{item.quantity}
													</span>
													<button
														onClick={() =>
															handleQuantityChange(item.id, item.quantity + 1)
														}
														disabled={isUpdating}
														className='bg-gray-700 hover:bg-gray-600 p-1 rounded-r-md transition-colors'
													>
														+
													</button>
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												${(item.price * item.quantity).toFixed(2)}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-right'>
												<button
													onClick={() => removeItem(item.id)}
													className='text-red-500 hover:text-red-400 transition-colors'
												>
													<Trash2 className='h-5 w-5' />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className='mt-6'>
						<Link
							href='/games'
							className='inline-flex items-center text-purple-500 hover:text-purple-400 transition-colors'
						>
							<ArrowLeft className='h-4 w-4 mr-2' />
							Continue Shopping
						</Link>
					</div>
				</div>

				<div className='lg:col-span-1'>
					<div className='bg-gray-800 rounded-lg p-6 sticky top-24'>
						<h2 className='text-xl font-bold mb-4'>Order Summary</h2>

						<div className='space-y-3 mb-6'>
							<div className='flex justify-between'>
								<span className='text-gray-400'>
									Subtotal ({totalItems} items)
								</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Shipping</span>
								<span>Free</span>
							</div>
							<div className='border-t border-gray-700 pt-3 flex justify-between font-bold'>
								<span>Total</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
						</div>

						<button
							className='w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-md transition-colors flex items-center justify-center'
							onClick={() => router.push('/checkout')}
						>
							<span>Proceed to Checkout</span>
							<ArrowRight className='h-4 w-4 ml-2' />
						</button>

						<p className='text-xs text-gray-400 mt-4 text-center'>
							Taxes and shipping calculated at checkout
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
