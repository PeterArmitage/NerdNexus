'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Gamepad2,
	Search,
	ShoppingCart,
	Menu,
	User,
	LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
	const { isAuthenticated, user, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Log auth state for debugging
	useEffect(() => {
		console.log('Auth state in Navigation:', { isAuthenticated, user });
	}, [isAuthenticated, user]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className='bg-gray-800 fixed w-full z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<Link href='/' className='flex items-center'>
							<Gamepad2 className='h-8 w-8 text-purple-500' />
							<span className='ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
								NerdNexus
							</span>
						</Link>
					</div>
					<div className='hidden md:block'>
						<div className='flex items-center space-x-4'>
							<Link
								href='/products'
								className='hover:text-purple-500 transition-colors'
							>
								Games
							</Link>
							<Link
								href='/anime'
								className='hover:text-purple-500 transition-colors'
							>
								Anime
							</Link>
							<Link
								href='/collectibles'
								className='hover:text-purple-500 transition-colors'
							>
								Collectibles
							</Link>
							<Link
								href='/community'
								className='hover:text-purple-500 transition-colors'
							>
								Community
							</Link>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<Search className='h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer' />
						<Link href='/cart'>
							<ShoppingCart className='h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer' />
						</Link>

						{isAuthenticated ? (
							<div className='relative group'>
								<button className='flex items-center space-x-1 hover:text-purple-500 transition-colors'>
									<User className='h-5 w-5' />
									<span className='hidden md:inline'>{user?.username}</span>
								</button>
								<div className='absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block'>
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
										onClick={logout}
										className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 hover:text-purple-500'
									>
										<div className='flex items-center'>
											<LogOut className='h-4 w-4 mr-2' />
											Logout
										</div>
									</button>
								</div>
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

						<Menu
							onClick={toggleMenu}
							className='h-5 w-5 md:hidden text-gray-400 cursor-pointer'
						/>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className='md:hidden bg-gray-800 pb-3 pt-2'>
						<div className='px-2 space-y-1'>
							<Link
								href='/products'
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
