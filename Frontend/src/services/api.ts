// Ensure we have a valid API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5138';

// Log for debugging
console.log('API URL:', API_URL);

// Helper to handle API responses
const handleResponse = async (response: Response) => {
	try {
		// For successful responses with no content
		if (response.status === 204) {
			return null;
		}

		// Handle 401 Unauthorized specifically
		if (response.status === 401) {
			const error = 'Unauthorized - Please log in again';
			console.error('Authentication error:', error);
			throw new Error(error);
		}

		// Check if the response has a content-type header and if it's JSON
		const contentType = response.headers.get('content-type');
		const isJson = contentType && contentType.includes('application/json');

		// Get the response data if it's JSON and not empty
		let data = null;
		if (isJson && response.headers.get('content-length') !== '0') {
			try {
				data = await response.json();
			} catch (e) {
				console.error('Error parsing JSON response:', e);
				data = null;
			}
		}

		if (!response.ok) {
			// Extract error message from response
			const error =
				(data && data.message) ||
				response.statusText ||
				`Error ${response.status}`;
			console.error(`API Error (${response.status}):`, error);
			throw new Error(error);
		}

		return data;
	} catch (error) {
		// Re-throw if it's already an Error
		if (error instanceof Error) {
			throw error;
		}
		// Otherwise, wrap in Error
		throw new Error(String(error));
	}
};

// Auth API calls
export const authApi = {
	login: async (username: string, password: string) => {
		try {
			console.log('Attempting login at:', `${API_URL}/api/Auth/login`);
			const response = await fetch(`${API_URL}/api/Auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await handleResponse(response);
			console.log('Login response received');
			return data;
		} catch (error) {
			console.error('Login request failed:', error);
			throw error;
		}
	},

	register: async (username: string, email: string, password: string) => {
		try {
			console.log(
				'Attempting registration at:',
				`${API_URL}/api/Auth/register`
			);
			const response = await fetch(`${API_URL}/api/Auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({ username, email, password }),
			});
			return handleResponse(response);
		} catch (error) {
			console.error('Register request failed:', error);
			throw error;
		}
	},

	getProfile: async (token: string) => {
		try {
			console.log('Fetching profile from:', `${API_URL}/api/Auth/profile`);

			// Check if token exists
			if (!token) {
				console.error('No token provided for profile request');
				throw new Error('Authentication token is missing');
			}

			// Show token structure for debugging
			const tokenParts = token.split('.');
			if (tokenParts.length !== 3) {
				console.error(
					'Token does not have the expected structure (header.payload.signature)'
				);
			} else {
				console.log('Token structure is correct (3 parts)');

				// Try to decode token payload for diagnostic purposes
				try {
					const payload = JSON.parse(atob(tokenParts[1]));
					console.log('Token payload:', {
						subject: payload.sub,
						expiration: new Date(payload.exp * 1000).toISOString(),
						issuedAt: new Date(payload.iat * 1000).toISOString(),
						expiresIn:
							Math.floor((payload.exp * 1000 - Date.now()) / 1000) + ' seconds',
					});
				} catch (e) {
					console.error('Could not decode token payload:', e);
				}
			}

			// Log headers for debugging (but mask the token)
			const tokenPreview =
				token.substring(0, 10) + '...' + token.substring(token.length - 10);
			console.log('Auth headers:', { Authorization: `Bearer ${tokenPreview}` });

			console.log('Making request to profile endpoint');
			const response = await fetch(`${API_URL}/api/Auth/profile`, {
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			console.log(
				'Profile response status:',
				response.status,
				response.statusText
			);
			return handleResponse(response);
		} catch (error) {
			console.error('Profile request failed:', error);
			throw error;
		}
	},

	updateProfile: async (token: string, userData: any) => {
		try {
			const response = await fetch(`${API_URL}/api/Auth/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(userData),
			});
			return handleResponse(response);
		} catch (error) {
			console.error('Update profile request failed:', error);
			throw error;
		}
	},
};

// Products API calls
export const productsApi = {
	getAll: async () => {
		try {
			const response = await fetch(`${API_URL}/api/Product`);
			return handleResponse(response);
		} catch (error) {
			console.error('Failed to fetch products:', error);
			return []; // Return empty array on connection error
		}
	},

	getById: async (id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/Product/${id}`);
			return handleResponse(response);
		} catch (error) {
			console.error(`Failed to fetch product ${id}:`, error);
			return null; // Return null on connection error
		}
	},

	getByCategory: async (category: string) => {
		try {
			const response = await fetch(
				`${API_URL}/api/Product/category/${category}`
			);
			return handleResponse(response);
		} catch (error) {
			console.error(`Failed to fetch products in category ${category}:`, error);
			return []; // Return empty array on connection error
		}
	},
};

// Orders API calls
export const ordersApi = {
	getAll: async (token: string) => {
		const response = await fetch(`${API_URL}/api/Order`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return handleResponse(response);
	},

	getById: async (token: string, id: number) => {
		const response = await fetch(`${API_URL}/api/Order/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return handleResponse(response);
	},

	create: async (token: string, orderData: any) => {
		const response = await fetch(`${API_URL}/api/Order`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(orderData),
		});
		return handleResponse(response);
	},
};

// Community API calls
export const communityApi = {
	getPosts: async () => {
		try {
			const response = await fetch(`${API_URL}/api/Community/posts`);
			return handleResponse(response);
		} catch (error) {
			console.error('Failed to fetch community posts:', error);
			return [];
		}
	},

	getPost: async (id: number) => {
		try {
			const response = await fetch(`${API_URL}/api/Community/posts/${id}`);
			return handleResponse(response);
		} catch (error) {
			console.error(`Failed to fetch post ${id}:`, error);
			return null;
		}
	},

	createPost: async (token: string, postData: any) => {
		const response = await fetch(`${API_URL}/api/Community/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(postData),
		});
		return handleResponse(response);
	},

	getReviews: async (productId: number) => {
		try {
			const response = await fetch(
				`${API_URL}/api/Community/reviews/product/${productId}`
			);
			return handleResponse(response);
		} catch (error) {
			console.error(`Failed to fetch reviews for product ${productId}:`, error);
			return [];
		}
	},

	createReview: async (token: string, reviewData: any) => {
		const response = await fetch(`${API_URL}/api/Community/reviews`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(reviewData),
		});
		return handleResponse(response);
	},
};

// Add a test method to check backend connectivity
export const testApi = {
	public: async () => {
		try {
			const response = await fetch(`${API_URL}/api/Test/public`);
			return handleResponse(response);
		} catch (error) {
			console.error('Public test request failed:', error);
			throw error;
		}
	},

	protected: async (token: string) => {
		try {
			const response = await fetch(`${API_URL}/api/Test/protected`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return handleResponse(response);
		} catch (error) {
			console.error('Protected test request failed:', error);
			throw error;
		}
	},
};
