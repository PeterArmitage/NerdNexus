'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Profile() {
	const { user, isAuthenticated, isLoading } = useAuth();
	const router = useRouter();
	const [formData, setFormData] = useState({
		email: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [message, setMessage] = useState({ type: '', text: '' });

	useEffect(() => {
		// Redirect to login if not authenticated
		if (!isLoading && !isAuthenticated) {
			router.push('/login');
		}

		// Set form data once user is loaded
		if (user) {
			setFormData({
				email: user.email,
			});
		}
	}, [isLoading, isAuthenticated, router, user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setMessage({ type: '', text: '' });

		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Authentication token not found');
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/profile`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						id: user?.id,
						username: user?.username,
						email: formData.email,
						createdAt: user?.createdAt,
						roles: [],
					}),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to update profile');
			}

			setMessage({
				type: 'success',
				text: 'Profile updated successfully!',
			});
		} catch (err: any) {
			setMessage({
				type: 'error',
				text: err.message || 'An error occurred while updating your profile',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16'>
				<div className='flex justify-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500'></div>
				</div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			<div className='mt-8'>
				<div className='max-w-3xl mx-auto'>
					<h1 className='text-3xl font-bold mb-8'>Your Profile</h1>

					{message.text && (
						<div
							className={`rounded-md p-4 mb-6 ${
								message.type === 'success' ? 'bg-green-800' : 'bg-red-800'
							}`}
						>
							<p>{message.text}</p>
						</div>
					)}

					<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
						<div className='mb-6'>
							<p className='text-sm text-gray-400'>Username</p>
							<p className='text-lg'>{user?.username}</p>
						</div>

						<form onSubmit={handleSubmit}>
							<div className='mb-6'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-400 mb-1'
								>
									Email
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={handleChange}
									className='w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500'
									required
								/>
							</div>

							<div className='mt-8'>
								<button
									type='submit'
									disabled={isSubmitting}
									className={`px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md font-medium transition-colors ${
										isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
									}`}
								>
									{isSubmitting ? 'Updating...' : 'Update Profile'}
								</button>
							</div>
						</form>
					</div>

					{/* Add sections for other profile features like order history, wishlists, etc. */}
					<div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
							<h2 className='text-xl font-semibold mb-4'>Recent Orders</h2>
							<p className='text-gray-400'>
								You haven't placed any orders yet.
							</p>
							<button className='mt-4 px-4 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-md font-medium transition-colors'>
								Browse Products
							</button>
						</div>

						<div className='bg-gray-800 p-6 rounded-lg shadow-md'>
							<h2 className='text-xl font-semibold mb-4'>Wishlist</h2>
							<p className='text-gray-400'>Your wishlist is empty.</p>
							<button className='mt-4 px-4 py-2 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-md font-medium transition-colors'>
								Discover Products
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
