'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, CreditCard, ShoppingBag, Truck } from 'lucide-react';

export default function CheckoutPage() {
	const router = useRouter();
	const { items, totalPrice, clearCart } = useCart();
	const { isAuthenticated, user } = useAuth();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [orderCompleted, setOrderCompleted] = useState(false);
	const [orderId, setOrderId] = useState<string | null>(null);

	// Form state
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		address: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'United States',
		phoneNumber: '',
		// Payment info would go here in a real application
	});

	// Error state
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Handle form input changes
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field when user types
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	// Validate the form
	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		// Required fields
		if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!formData.address.trim()) newErrors.address = 'Address is required';
		if (!formData.city.trim()) newErrors.city = 'City is required';
		if (!formData.state.trim()) newErrors.state = 'State is required';
		if (!formData.postalCode.trim())
			newErrors.postalCode = 'Postal code is required';
		if (!formData.phoneNumber.trim())
			newErrors.phoneNumber = 'Phone number is required';

		// Email validation
		if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		// Phone validation (simple)
		if (
			formData.phoneNumber &&
			!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))
		) {
			newErrors.phoneNumber = 'Please enter a valid phone number';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (currentStep === 1 && validateForm()) {
			// Move to payment step in a real app
			setCurrentStep(2);
			return;
		}

		if (currentStep === 2) {
			// Process payment and submit order
			setIsSubmitting(true);

			try {
				// Simulate API call
				await new Promise((resolve) => setTimeout(resolve, 2000));

				// Generate a fake order ID
				const fakeOrderId = `ORD-${Date.now()}-${Math.floor(
					Math.random() * 1000
				)}`;
				setOrderId(fakeOrderId);
				setOrderCompleted(true);
				clearCart();

				// In a real app, you would submit to your backend API
				// const response = await fetch('/api/orders', {
				//   method: 'POST',
				//   headers: { 'Content-Type': 'application/json' },
				//   body: JSON.stringify({
				//     items,
				//     shippingAddress: formData,
				//     userId: user?.id
				//   })
				// });

				// if (!response.ok) throw new Error('Failed to create order');
				// const data = await response.json();
				// setOrderId(data.orderId);
			} catch (error) {
				console.error('Error creating order:', error);
				// Handle error (show message to user)
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	// Redirect to login if not authenticated
	if (!isAuthenticated && !orderCompleted) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				<div className='text-center py-16'>
					<h1 className='text-2xl font-bold mb-4'>Please log in to checkout</h1>
					<p className='text-gray-400 mb-8'>
						You need to be logged in to complete your purchase.
					</p>
					<Link
						href='/login?redirect=/checkout'
						className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors'
					>
						Log in
					</Link>
				</div>
			</div>
		);
	}

	// If cart is empty and order not completed, redirect to cart
	if (items.length === 0 && !orderCompleted) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				<div className='text-center py-16'>
					<ShoppingBag className='h-16 w-16 mx-auto text-gray-400 mb-4' />
					<h1 className='text-2xl font-bold mb-4'>Your cart is empty</h1>
					<p className='text-gray-400 mb-8'>
						Add some items to your cart before proceeding to checkout.
					</p>
					<Link
						href='/games'
						className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors'
					>
						Browse Games
					</Link>
				</div>
			</div>
		);
	}

	// Order completion screen
	if (orderCompleted) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
				<div className='bg-gray-800 rounded-lg p-8 max-w-3xl mx-auto'>
					<div className='text-center mb-8'>
						<div className='h-24 w-24 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-12 w-12 text-white'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
						</div>
						<h1 className='text-3xl font-bold mb-2'>Order Confirmed!</h1>
						<p className='text-gray-400 text-lg'>Thank you for your purchase</p>
						{orderId && (
							<p className='mt-4 text-gray-300'>
								Order ID:{' '}
								<span className='font-mono font-medium'>{orderId}</span>
							</p>
						)}
					</div>

					<div className='space-y-4 mb-8'>
						<p>A confirmation email has been sent to {formData.email}</p>
						<p>You'll receive another email when your order ships.</p>
					</div>

					<div className='flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
						<Link
							href='/games'
							className='bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md transition-colors text-center'
						>
							Continue Shopping
						</Link>
						<Link
							href='/orders'
							className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors text-center'
						>
							View Your Orders
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='flex flex-col lg:flex-row gap-8'>
				{/* Checkout form */}
				<div className='lg:w-2/3'>
					<h1 className='text-3xl font-bold mb-6'>Checkout</h1>

					{/* Progress steps */}
					<div className='mb-8'>
						<div className='flex items-center'>
							<div
								className={`flex items-center justify-center h-8 w-8 rounded-full ${
									currentStep >= 1 ? 'bg-purple-600' : 'bg-gray-700'
								}`}
							>
								1
							</div>
							<div
								className={`flex-1 h-1 mx-2 ${
									currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-700'
								}`}
							></div>
							<div
								className={`flex items-center justify-center h-8 w-8 rounded-full ${
									currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-700'
								}`}
							>
								2
							</div>
						</div>
						<div className='flex text-xs mt-1'>
							<div className='flex-1'>Shipping</div>
							<div className='flex-1 text-right'>Payment</div>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						{currentStep === 1 && (
							<div className='bg-gray-800 rounded-lg p-6 mb-6'>
								<h2 className='text-xl font-semibold mb-4 flex items-center'>
									<Truck className='h-5 w-5 mr-2' />
									Shipping Information
								</h2>

								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div className='col-span-2'>
										<label htmlFor='fullName' className='block mb-1'>
											Full Name
										</label>
										<input
											type='text'
											id='fullName'
											name='fullName'
											value={formData.fullName}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.fullName ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.fullName && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.fullName}
											</p>
										)}
									</div>

									<div className='col-span-2'>
										<label htmlFor='email' className='block mb-1'>
											Email
										</label>
										<input
											type='email'
											id='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.email ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.email && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.email}
											</p>
										)}
									</div>

									<div className='col-span-2'>
										<label htmlFor='address' className='block mb-1'>
											Address
										</label>
										<input
											type='text'
											id='address'
											name='address'
											value={formData.address}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.address ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.address && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.address}
											</p>
										)}
									</div>

									<div>
										<label htmlFor='city' className='block mb-1'>
											City
										</label>
										<input
											type='text'
											id='city'
											name='city'
											value={formData.city}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.city ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.city && (
											<p className='text-red-500 text-sm mt-1'>{errors.city}</p>
										)}
									</div>

									<div>
										<label htmlFor='state' className='block mb-1'>
											State
										</label>
										<input
											type='text'
											id='state'
											name='state'
											value={formData.state}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.state ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.state && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.state}
											</p>
										)}
									</div>

									<div>
										<label htmlFor='postalCode' className='block mb-1'>
											Postal Code
										</label>
										<input
											type='text'
											id='postalCode'
											name='postalCode'
											value={formData.postalCode}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.postalCode ? 'border-red-500' : 'border-gray-600'
											}`}
										/>
										{errors.postalCode && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.postalCode}
											</p>
										)}
									</div>

									<div>
										<label htmlFor='country' className='block mb-1'>
											Country
										</label>
										<select
											id='country'
											name='country'
											value={formData.country}
											onChange={handleChange}
											className='w-full bg-gray-700 rounded-md px-4 py-2 border border-gray-600'
										>
											<option value='United States'>United States</option>
											<option value='Canada'>Canada</option>
											<option value='United Kingdom'>United Kingdom</option>
											<option value='Australia'>Australia</option>
											<option value='Germany'>Germany</option>
											<option value='France'>France</option>
											<option value='Japan'>Japan</option>
										</select>
									</div>

									<div className='col-span-2'>
										<label htmlFor='phoneNumber' className='block mb-1'>
											Phone Number
										</label>
										<input
											type='tel'
											id='phoneNumber'
											name='phoneNumber'
											value={formData.phoneNumber}
											onChange={handleChange}
											className={`w-full bg-gray-700 rounded-md px-4 py-2 border ${
												errors.phoneNumber
													? 'border-red-500'
													: 'border-gray-600'
											}`}
										/>
										{errors.phoneNumber && (
											<p className='text-red-500 text-sm mt-1'>
												{errors.phoneNumber}
											</p>
										)}
									</div>
								</div>
							</div>
						)}

						{currentStep === 2 && (
							<div className='bg-gray-800 rounded-lg p-6 mb-6'>
								<h2 className='text-xl font-semibold mb-4 flex items-center'>
									<CreditCard className='h-5 w-5 mr-2' />
									Payment Method
								</h2>

								<div className='mb-4'>
									<p className='mb-4'>
										This is a demo application. No actual payment will be
										processed.
									</p>
									<p className='mb-4'>
										In a real application, you would integrate with a payment
										processor like Stripe, PayPal, or Square.
									</p>
									<div className='bg-gray-700 p-4 rounded-md'>
										<p>Demo Credit Card</p>
										<p className='font-mono mt-2'>4242 4242 4242 4242</p>
										<div className='grid grid-cols-2 gap-4 mt-2'>
											<p>Exp: 12/25</p>
											<p>CVC: 123</p>
										</div>
									</div>
								</div>

								<div className='flex justify-between items-center'>
									<button
										type='button'
										onClick={() => setCurrentStep(1)}
										className='text-purple-400 hover:text-purple-300 flex items-center'
									>
										<ArrowLeft className='h-4 w-4 mr-2' />
										Back to Shipping
									</button>
								</div>
							</div>
						)}

						<div className='flex justify-between'>
							<Link
								href='/cart'
								className='text-purple-400 hover:text-purple-300 flex items-center'
							>
								<ArrowLeft className='h-4 w-4 mr-2' />
								Back to Cart
							</Link>

							<button
								type='submit'
								disabled={isSubmitting}
								className={`bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md transition-colors flex items-center ${
									isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							>
								{isSubmitting ? (
									<>
										<div className='animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2'></div>
										Processing...
									</>
								) : currentStep === 1 ? (
									'Continue to Payment'
								) : (
									'Place Order'
								)}
							</button>
						</div>
					</form>
				</div>

				{/* Order summary */}
				<div className='lg:w-1/3'>
					<div className='bg-gray-800 rounded-lg p-6 sticky top-24'>
						<h2 className='text-xl font-semibold mb-4'>Order Summary</h2>

						<div className='max-h-64 overflow-y-auto mb-4'>
							{items.map((item) => (
								<div
									key={item.id}
									className='flex py-3 border-b border-gray-700'
								>
									<div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md'>
										<img
											src={item.imageUrl}
											alt={item.name}
											className='h-full w-full object-cover object-center'
										/>
									</div>
									<div className='ml-3 flex flex-col flex-1'>
										<div className='font-medium'>{item.name}</div>
										<div className='text-gray-400 text-sm'>
											Qty: {item.quantity}
										</div>
										<div className='mt-auto text-right'>
											${(item.price * item.quantity).toFixed(2)}
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='space-y-3 mb-6'>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Subtotal</span>
								<span>${totalPrice.toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Shipping</span>
								<span>Free</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-gray-400'>Tax</span>
								<span>${(totalPrice * 0.08).toFixed(2)}</span>
							</div>
							<div className='border-t border-gray-700 pt-3 flex justify-between font-bold'>
								<span>Total</span>
								<span>${(totalPrice + totalPrice * 0.08).toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
