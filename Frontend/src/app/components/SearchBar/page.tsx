'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
	placeholder?: string;
	initialQuery?: string;
	onSearch?: (query: string) => void;
	className?: string;
	autoFocus?: boolean;
}

export default function SearchBar({
	placeholder = 'Search products...',
	initialQuery = '',
	onSearch,
	className = '',
	autoFocus = false,
}: SearchBarProps) {
	const [query, setQuery] = useState(initialQuery);
	const [isFocused, setIsFocused] = useState(false);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (autoFocus && inputRef.current) {
			inputRef.current.focus();
		}
	}, [autoFocus]);

	const handleSearch = () => {
		if (onSearch) {
			onSearch(query);
		} else {
			// Default behavior: navigate to search page with query
			if (query.trim()) {
				router.push(`/search?q=${encodeURIComponent(query.trim())}`);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const clearSearch = () => {
		setQuery('');
		if (inputRef.current) {
			inputRef.current.focus();
		}
		if (onSearch) {
			onSearch('');
		}
	};

	return (
		<div
			className={`flex items-center relative rounded-md ${
				isFocused ? 'ring-2 ring-purple-500' : 'ring-1 ring-gray-700'
			} bg-gray-800 ${className}`}
		>
			<Search className='absolute left-3 h-5 w-5 text-gray-400' />

			<input
				ref={inputRef}
				type='text'
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				placeholder={placeholder}
				className='pl-10 pr-10 py-2 w-full bg-transparent outline-none'
				aria-label='Search'
			/>

			{query && (
				<button
					onClick={clearSearch}
					className='absolute right-10 p-1 text-gray-400 hover:text-white'
					aria-label='Clear search'
				>
					<X className='h-4 w-4' />
				</button>
			)}

			<button
				onClick={handleSearch}
				className='absolute right-2 p-1 text-gray-400 hover:text-purple-500'
				aria-label='Submit search'
			>
				<Search className='h-4 w-4' />
			</button>
		</div>
	);
}
