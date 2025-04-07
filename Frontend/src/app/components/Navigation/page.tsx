'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
	Gamepad2,
	Search,
	ShoppingCart,
	Menu,
	User,
	LogOut,
	X,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import SearchBar from '@/app/components/SearchBar/page';

export default function Navigation() {
	const { isAuthenticated, user, logout } = useAuth();
	const { totalItems } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const userMenuRef = useRef<HTMLDivElement>(null);
	const userButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		console.log('Auth state in Navigation:', { isAuthenticated, user });
	}, [isAuthenticated, user]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				userMenuRef.current &&
				userButtonRef.current &&
				!userMenuRef.current.contains(event.target as Node) &&
				!userButtonRef.current.contains(event.target as Node)
			) {
				setIsUserMenuOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const toggleUserMenu = () => {
		setIsUserMenuOpen(!isUserMenuOpen);
	};

	return (
		<nav className='bg-gray-900 fixed w-full z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<Gamepad2 className='h-8 w-8 text-purple-500' />
						<Link
							href='/'
							className='ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'
						>
							NerdNexus
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className='hidden md:block'>
						<div className='flex items-center space-x-4'>
							<Link
								href='/games'
								className='text-gray-300 hover:text-purple-500 transition-colors'
							>
								Games
							</Link>
							<Link
								href='/anime'
								className='text-gray-300 hover:text-purple-500 transition-colors'
							>
								Anime
							</Link>
							<Link
								href='/collectibles'
								className='text-gray-300 hover:text-purple-500 transition-colors'
							>
								Collectibles
							</Link>
							<div className='w-48 ml-2'>
								<SearchBar />
							</div>
							<Link
								href='/cart'
								className='text-gray-300 hover:text-purple-500 transition-colors relative'
							>
								<ShoppingCart className='h-6 w-6' />
								{totalItems > 0 && (
									<span className='absolute -top-2 -right-2 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
										{totalItems}
									</span>
								)}
							</Link>
							{isAuthenticated ? (
								<div className='relative'>
									<button
										ref={userButtonRef}
										onClick={toggleUserMenu}
										className='flex items-center space-x-1 hover:text-purple-500 transition-colors'
									>
										<User className='h-5 w-5' />
										<span className='hidden md:inline'>{user?.username}</span>
									</button>
									{isUserMenuOpen && (
										<div
											ref={userMenuRef}
											className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50'
										>
											<Link
												href='/profile'
												className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-purple-500'
											>
												Profile
											</Link>
											<Link
												href='/orders'
												className='block px-4 py-2 text-sm hover:bg-gray-700 hover:text-purple-500'
											>
												Orders
											</Link>
											<button
												onClick={() => {
													logout();
													setIsUserMenuOpen(false);
												}}
												className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-purple-500'
											>
												<div className='flex items-center'>
													<LogOut className='h-4 w-4 mr-2' />
													Logout
												</div>
											</button>
										</div>
									)}
								</div>
							) : (
								<div className='flex items-center space-x-3'>
									<Link
										href='/login'
										className='text-sm font-medium hover:text-purple-500 transition-colors'
									>
										Login
									</Link>
									<Link
										href='/register'
										className='text-sm font-medium bg-purple-600 py-1 px-3 rounded-md hover:bg-purple-700 transition-colors'
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
					<div className='flex items-center space-x-4 md:hidden'>
						<Search className='h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer' />
						<Menu
							onClick={toggleMenu}
							className='h-5 w-5 text-gray-400 cursor-pointer'
						/>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className='md:hidden bg-gray-800 pb-3 pt-2'>
						<div className='px-2 space-y-1'>
							<Link
								href='/games'
								className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
							>
								Games
							</Link>
							<Link
								href='/anime'
								className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
							>
								Anime
							</Link>
							<Link
								href='/collectibles'
								className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
							>
								Collectibles
							</Link>
							<Link
								href='/community'
								className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
							>
								Community
							</Link>

							{!isAuthenticated && (
								<>
									<Link
										href='/login'
										className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
									>
										Login
									</Link>
									<Link
										href='/register'
										className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
									>
										Register
									</Link>
								</>
							)}

							{isAuthenticated && (
								<>
									<Link
										href='/profile'
										className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
									>
										Profile
									</Link>
									<Link
										href='/orders'
										className='block px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
									>
										Orders
									</Link>
									<button
										onClick={logout}
										className='flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 hover:text-purple-500'
									>
										<LogOut className='h-4 w-4 mr-2' />
										Logout
									</button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
