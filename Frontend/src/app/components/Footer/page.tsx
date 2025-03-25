import { Gamepad2, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
					<div>
						<div className='flex items-center mb-4'>
							<Gamepad2 className='h-8 w-8 text-purple-500' />
							<span className='ml-2 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>
								NerdNexus
							</span>
						</div>
						<p className='text-gray-400'>
							Your gateway to gaming and anime culture
						</p>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									About Us
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Contact
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									FAQs
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Categories</h3>
						<ul className='space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Games
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Anime
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Collectibles
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 hover:text-purple-500 transition-colors'
								>
									Accessories
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-purple-500 transition-colors'
							>
								<Twitter className='h-6 w-6' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-purple-500 transition-colors'
							>
								<Instagram className='h-6 w-6' />
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-purple-500 transition-colors'
							>
								<Facebook className='h-6 w-6' />
							</a>
						</div>
					</div>
				</div>
				<div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
					© {new Date().getFullYear()} NerdNexus. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
