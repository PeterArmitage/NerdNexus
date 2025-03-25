import { Gamepad2, Search, ShoppingCart, Menu } from 'lucide-react';

export default function Navigation() {
	return (
		<nav className='bg-gray-800 fixed w-full z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<Gamepad2 className='h-8 w-8 text-purple-500' />
						<span className='ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
							NerdNexus
						</span>
					</div>
					<div className='hidden md:block'>
						<div className='flex items-center space-x-4'>
							<a href='#' className='hover:text-purple-500 transition-colors'>
								Games
							</a>
							<a href='#' className='hover:text-purple-500 transition-colors'>
								Anime
							</a>
							<a href='#' className='hover:text-purple-500 transition-colors'>
								Collectibles
							</a>
							<a href='#' className='hover:text-purple-500 transition-colors'>
								Community
							</a>
						</div>
					</div>
					<div className='flex items-center space-x-4'>
						<Search className='h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer' />
						<ShoppingCart className='h-5 w-5 text-gray-400 hover:text-purple-500 cursor-pointer' />
						<Menu className='h-5 w-5 md:hidden text-gray-400' />
					</div>
				</div>
			</div>
		</nav>
	);
}
