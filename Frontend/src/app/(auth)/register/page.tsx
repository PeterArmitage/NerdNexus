'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { authApi } from '@/services/api';

export default function Register() {
	const router = useRouter();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [apiError, setApiError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear field-specific error when user types
		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}

		// Clear API error on any change
		if (apiError) {
			setApiError('');
		}
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		// Validate username
		if (!formData.username.trim()) {
			newErrors.username = 'Username is required';
		} else if (formData.username.length < 3) {
			newErrors.username = 'Username must be at least 3 characters';
		} else if (formData.username.length > 50) {
			newErrors.username = 'Username cannot exceed 50 characters';
		} else if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
			newErrors.username =
				'Username can only contain letters, numbers, underscores, and hyphens';
		}

		// Validate email
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid';
		}

		// Validate password
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
		} else if (!/[A-Z]/.test(formData.password)) {
			newErrors.password =
				'Password must contain at least one uppercase letter';
		} else if (!/[a-z]/.test(formData.password)) {
			newErrors.password =
				'Password must contain at least one lowercase letter';
		} else if (!/[0-9]/.test(formData.password)) {
			newErrors.password = 'Password must contain at least one number';
		} else if (!/[^a-zA-Z0-9]/.test(formData.password)) {
			newErrors.password =
				'Password must contain at least one special character';
		}

		// Validate password confirmation
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		setApiError('');

		try {
			console.log('API URL from env:', process.env.NEXT_PUBLIC_API_URL);
			await authApi.register(
				formData.username,
				formData.email,
				formData.password
			);
			router.push('/login?registered=true');
		} catch (err: any) {
			console.error('Registration error:', err);

			// Handle specific errors differently
			const errorMessage = err.message?.toLowerCase() || '';

			if (errorMessage.includes('username already exists')) {
				setErrors((prev) => ({
					...prev,
					username: 'This username is already taken',
				}));
			} else if (errorMessage.includes('email already exists')) {
				setErrors((prev) => ({
					...prev,
					email: 'This email is already registered',
				}));
			} else {
				setApiError(err.message || 'An error occurred during registration');
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
					Create your account
				</h2>
				<p className='mt-2 text-center text-sm text-gray-400'>
					Already have an account?{' '}
					<Link
						href='/login'
						className='font-medium text-purple-500 hover:text-purple-400'
					>
						Sign in
					</Link>
				</p>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					{apiError && (
						<div className='bg-red-500 text-white p-3 rounded mb-4'>
							{apiError}
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
									className={`appearance-none block w-full px-3 py-2 border ${
										errors.username ? 'border-red-500' : 'border-gray-600'
									} rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
								/>
								{errors.username && (
									<p className='mt-1 text-sm text-red-500'>{errors.username}</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-300'
							>
								Email address
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={formData.email}
									onChange={handleChange}
									className={`appearance-none block w-full px-3 py-2 border ${
										errors.email ? 'border-red-500' : 'border-gray-600'
									} rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
								/>
								{errors.email && (
									<p className='mt-1 text-sm text-red-500'>{errors.email}</p>
								)}
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
									autoComplete='new-password'
									required
									value={formData.password}
									onChange={handleChange}
									className={`appearance-none block w-full px-3 py-2 border ${
										errors.password ? 'border-red-500' : 'border-gray-600'
									} rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
								/>
								{errors.password && (
									<p className='mt-1 text-sm text-red-500'>{errors.password}</p>
								)}
							</div>
						</div>

						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium text-gray-300'
							>
								Confirm password
							</label>
							<div className='mt-1'>
								<input
									id='confirmPassword'
									name='confirmPassword'
									type='password'
									autoComplete='new-password'
									required
									value={formData.confirmPassword}
									onChange={handleChange}
									className={`appearance-none block w-full px-3 py-2 border ${
										errors.confirmPassword
											? 'border-red-500'
											: 'border-gray-600'
									} rounded-md shadow-sm placeholder-gray-400 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm`}
								/>
								{errors.confirmPassword && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.confirmPassword}
									</p>
								)}
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
								{isLoading ? 'Creating account...' : 'Create account'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
