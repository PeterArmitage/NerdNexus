'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the cart item interface
export interface CartItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
}

// Define the cart context interface
interface CartContextType {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	clearCart: () => void;
	totalItems: number;
	totalPrice: number;
}

// Create the context with default values
const CartContext = createContext<CartContextType>({
	items: [],
	addItem: () => {},
	removeItem: () => {},
	updateQuantity: () => {},
	clearCart: () => {},
	totalItems: 0,
	totalPrice: 0,
});

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Initialize state from localStorage if available
	const [items, setItems] = useState<CartItem[]>(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			return savedCart ? JSON.parse(savedCart) : [];
		}
		return [];
	});

	// Calculate total items and price
	const totalItems = items.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = items.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}, [items]);

	// Add an item to the cart
	const addItem = (newItem: CartItem) => {
		setItems((prevItems) => {
			// Check if the item already exists in the cart
			const existingItemIndex = prevItems.findIndex(
				(item) => item.id === newItem.id
			);

			if (existingItemIndex >= 0) {
				// If it exists, update the quantity
				const updatedItems = [...prevItems];
				updatedItems[existingItemIndex].quantity += newItem.quantity;
				return updatedItems;
			} else {
				// If it doesn't exist, add it to the cart
				return [...prevItems, newItem];
			}
		});
	};

	// Remove an item from the cart
	const removeItem = (id: number) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	};

	// Update the quantity of an item
	const updateQuantity = (id: number, quantity: number) => {
		if (quantity <= 0) {
			removeItem(id);
			return;
		}

		setItems((prevItems) =>
			prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
		);
	};

	// Clear the cart
	const clearCart = () => {
		setItems([]);
	};

	// Provide the context value
	const value = {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		totalItems,
		totalPrice,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Create a custom hook to use the cart context
export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
