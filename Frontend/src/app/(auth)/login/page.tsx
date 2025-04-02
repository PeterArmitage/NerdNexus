'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/services/api';

export default function Login() {
	const router = useRouter();
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user types
		if (error) {
			setError('');
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			console.log('Login form submitted:', {
				username: formData.username,
				password: '********',
			});

			// Use the API service for login
			const data = await authApi.login(formData.username, formData.password);
			console.log('Login API response received');

			if (!data || !data.token) {
				console.error('Invalid response from server:', data);
				throw new Error('Server did not return an authentication token');
			}

			console.log('Token received, attempting to authenticate');
			// Use the AuthContext login function
			const loginSuccess = await login(data.token);

			if (loginSuccess) {
				console.log('Login successful, redirecting to home page');
				// Redirect to home page on success
				router.push('/');
			} else {
				console.error('Login failed: Authentication with token failed');
				throw new Error('Authentication failed. Please try again.');
			}
		} catch (err: any) {
			console.error('Login error:', err);

			// Provide user-friendly error messages
			if (err.message.includes('Unauthorized')) {
				setError('Invalid username or password');
			} else if (
				err.message.includes('network') ||
				err.message.includes('fetch')
			) {
				setError(
					'Unable to connect to the server. Please check your internet connection.'
				);
			} else {
				setError(err.message || 'An error occurred during login');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='flex justify-center'>
					<Gamepad2 className='h-12 w-12 text-purple-500' />
				</div>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
					Sign in to NerdNexus
				</h2>
				<p className='mt-2 text-center text-sm text-gray-400'>
					Or{' '}
					<Link
						href='/register'
						className='font-medium text-purple-500 hover:text-purple-400'
					>
						create a new account
					</Link>
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{error && (
						<div className='bg-red-500 text-white p-3 rounded mb-4'>
							{error}
						</div>
					)}

					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='username'
								className='block text-sm font-medium text-gray-300'
							>
								Username
							</label>
							<div className='mt-1'>
								<input
									id='username'
									name='username'
									type='text'
									autoComplete='username'
									required
									value={formData.username}
									onChange={handleChange}
									className='appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-300'
							>
								Password
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									value={formData.password}
									onChange={handleChange}
									className='appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm'
								/>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<input
									id='remember-me'
									name='remember-me'
									type='checkbox'
									className='h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700'
								/>
								<label
									htmlFor='remember-me'
									className='ml-2 block text-sm text-gray-300'
								>
									Remember me
								</label>
							</div>

							<div className='text-sm'>
								<a
									href='#'
									className='font-medium text-purple-500 hover:text-purple-400'
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={isLoading}
								className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
									isLoading ? 'opacity-70 cursor-not-allowed' : ''
								}`}
							>
								{isLoading ? 'Signing in...' : 'Sign in'}
							</button>
						</div>

						<div className='text-center text-xs text-gray-500 mt-4'>
							<p>API URL: {process.env.NEXT_PUBLIC_API_URL || 'Not set'}</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
