'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';

// Define user type
interface User {
	id: number;
	username: string;
	email: string;
	createdAt: string;
}

// Define auth context type
interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (token: string) => Promise<boolean>;
	logout: () => void;
	isAuthenticated: boolean;
	getAuthHeader: () => HeadersInit | undefined;
	authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
	login: async () => false,
	logout: () => {},
	isAuthenticated: false,
	getAuthHeader: () => undefined,
	authFetch: async () => new Response(),
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Function to parse JWT token
	const parseJwt = (token: string) => {
		try {
			return JSON.parse(atob(token.split('.')[1]));
		} catch (e) {
			console.error('Error parsing JWT token:', e);
			return null;
		}
	};

	// Check if token is expired
	const isTokenExpired = (token: string): boolean => {
		const decodedToken = parseJwt(token);
		if (!decodedToken) return true;

		const currentTime = Date.now() / 1000;
		return decodedToken.exp < currentTime;
	};

	// Function to get user profile from API
	const getUserProfile = async (token: string) => {
		try {
			// First try a simpler protected endpoint to test token validity
			console.log('Testing token with protected endpoint');
			try {
				const testResponse = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/Test/protected`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log(
					'Test endpoint response:',
					testResponse.status,
					testResponse.statusText
				);

				if (testResponse.status === 401) {
					console.error(
						'Token rejected by test endpoint - authentication issue'
					);
					return null;
				}

				// If the test endpoint works, then try the actual profile endpoint
				console.log(
					'Token works with test endpoint, now fetching user profile'
				);
			} catch (testError) {
				console.error('Error testing token:', testError);
				// Continue anyway to try the actual profile endpoint
			}

			// Now try to get the profile data
			console.log('Attempting to fetch user profile with token');
			const userData = await authApi.getProfile(token);
			console.log('User profile data received:', userData);
			return userData;
		} catch (error) {
			console.error('Error fetching user profile:', error);
			return null;
		}
	};

	// Function to get auth header with token
	const getAuthHeader = (): HeadersInit | undefined => {
		const token = localStorage.getItem('token');
		return token ? { Authorization: `Bearer ${token}` } : undefined;
	};

	// Function for authenticated fetch requests
	const authFetch = async (
		url: string,
		options: RequestInit = {}
	): Promise<Response> => {
		const token = localStorage.getItem('token');

		if (!token) {
			throw new Error('No authentication token found');
		}

		// Check if token is expired
		if (isTokenExpired(token)) {
			localStorage.removeItem('token');
			setUser(null);
			throw new Error('Authentication token has expired. Please login again.');
		}

		// Add token to headers
		const authHeaders = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};

		// Make the request with auth headers
		const response = await fetch(url, {
			...options,
			headers: authHeaders,
		});

		// Handle 401 responses (token rejected)
		if (response.status === 401) {
			localStorage.removeItem('token');
			setUser(null);
			throw new Error('Authentication token was rejected. Please login again.');
		}

		return response;
	};

	// Login function
	const login = async (token: string): Promise<boolean> => {
		try {
			// Log the token (but mask most of it for security)
			const tokenPreview =
				token.substring(0, 10) + '...' + token.substring(token.length - 10);
			console.log('Login with token:', tokenPreview);

			// Store the token
			localStorage.setItem('token', token);

			// Validate the token structure
			if (!token || token.split('.').length !== 3) {
				console.error('Invalid token format');
				localStorage.removeItem('token');
				return false;
			}

			// Get user data with the token
			const userData = await getUserProfile(token);

			if (userData) {
				console.log('Login successful, user data:', userData);
				setUser(userData);
				return true;
			}

			// If we couldn't get user data, remove the token
			console.error('Failed to get user data with token');
			localStorage.removeItem('token');
			return false;
		} catch (error) {
			console.error('Login error:', error);
			localStorage.removeItem('token');
			return false;
		}
	};

	// Logout function
	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
		router.push('/login');
	};

	// Check authentication on initial load
	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true);
			try {
				const token = localStorage.getItem('token');
				console.log(
					'Checking authentication with stored token:',
					token ? 'Found' : 'Not found'
				);

				if (token && !isTokenExpired(token)) {
					console.log('Token is valid, getting user profile');
					const userData = await getUserProfile(token);
					if (userData) {
						console.log('Setting user from stored token');
						setUser(userData);
					} else {
						console.log('Could not get user data with stored token');
						localStorage.removeItem('token');
					}
				} else if (token) {
					// Token exists but is expired
					console.log('Token expired, removing');
					localStorage.removeItem('token');
				}
			} catch (error) {
				console.error('Auth check error:', error);
				localStorage.removeItem('token');
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const value = {
		user,
		isLoading,
		login,
		logout,
		isAuthenticated: !!user,
		getAuthHeader,
		authFetch,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
