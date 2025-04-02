'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
	MessageSquare,
	Users,
	Calendar,
	TrendingUp,
	Star,
	Eye,
	Heart,
	Clock,
	Image as ImageIcon,
	Monitor,
	Search,
	ChevronRight,
} from 'lucide-react';

// Placeholder forum categories
const forumCategories = [
	{
		id: 1,
		name: 'Gaming Discussion',
		icon: <Monitor className='h-6 w-6 text-blue-500' />,
		topics: 856,
		posts: 4230,
		description: 'General gaming discussions, news, tips, and recommendations.',
	},
	{
		id: 2,
		name: 'Anime & Manga',
		icon: <ImageIcon className='h-6 w-6 text-pink-500' />,
		topics: 623,
		posts: 3184,
		description:
			'Discuss your favorite anime series, manga, and related content.',
	},
	{
		id: 3,
		name: 'Collectibles',
		icon: <Star className='h-6 w-6 text-yellow-500' />,
		topics: 412,
		posts: 1897,
		description:
			'Share your collections, ask questions, and discuss rare finds.',
	},
	{
		id: 4,
		name: 'Trading & Marketplace',
		icon: <Users className='h-6 w-6 text-green-500' />,
		topics: 245,
		posts: 1352,
		description: 'Buy, sell, and trade with other community members.',
	},
	{
		id: 5,
		name: 'Tech & Hardware',
		icon: <Monitor className='h-6 w-6 text-purple-500' />,
		topics: 389,
		posts: 2103,
		description:
			'Discussions about gaming hardware, PC builds, and tech reviews.',
	},
	{
		id: 6,
		name: 'Off-Topic',
		icon: <MessageSquare className='h-6 w-6 text-gray-500' />,
		topics: 278,
		posts: 1654,
		description:
			'Chat about anything not related to gaming, anime, or collectibles.',
	},
];

// Placeholder trending topics
const trendingTopics = [
	{
		id: 1,
		title: 'Final Fantasy VII Rebirth - First Impressions',
		category: 'Gaming Discussion',
		author: 'CloudStrife',
		replies: 87,
		views: 1243,
		lastPost: '2 hours ago',
		hot: true,
	},
	{
		id: 2,
		title: 'Demon Slayer Season 4 Announcement Discussion',
		category: 'Anime & Manga',
		author: 'TanjiroFan',
		replies: 64,
		views: 982,
		lastPost: '5 hours ago',
		hot: true,
	},
	{
		id: 3,
		title: 'Where to find limited edition Final Fantasy figures?',
		category: 'Collectibles',
		author: 'MoogleHunter',
		replies: 32,
		views: 576,
		lastPost: '12 hours ago',
		hot: false,
	},
	{
		id: 4,
		title: 'Steam Deck vs Nintendo Switch - Which to buy?',
		category: 'Tech & Hardware',
		author: 'GamerOnTheGo',
		replies: 112,
		views: 2310,
		lastPost: '1 day ago',
		hot: true,
	},
	{
		id: 5,
		title: 'Trading my rare Pokemon cards, post offers here',
		category: 'Trading & Marketplace',
		author: 'PokeMaster99',
		replies: 47,
		views: 823,
		lastPost: '2 days ago',
		hot: false,
	},
];

// Placeholder community events
const upcomingEvents = [
	{
		id: 1,
		title: 'Virtual Board Game Night',
		date: 'May 15, 2023',
		time: '7:00 PM EST',
		attendees: 34,
		description:
			"Join us for a night of virtual board games! We'll be playing a variety of online games together.",
	},
	{
		id: 2,
		title: 'Anime Watch Party: Attack on Titan Finale',
		date: 'May 20, 2023',
		time: '8:00 PM EST',
		attendees: 89,
		description:
			"Let's watch and discuss the final episode of Attack on Titan together!",
	},
	{
		id: 3,
		title: 'Community Gaming Tournament: League of Legends',
		date: 'June 5, 2023',
		time: '6:00 PM EST',
		attendees: 56,
		description:
			'Test your skills in our League of Legends tournament! Prizes for the top 3 teams.',
	},
];

export default function CommunityPage() {
	const { isAuthenticated, user } = useAuth();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16'>
			{/* Hero section */}
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-bold text-white mb-4'>
					NerdNexus Community
				</h1>
				<p className='text-gray-400 max-w-3xl mx-auto'>
					Join thousands of fellow enthusiasts discussing games, anime, and
					collectibles. Share your passion, get help, and make new friends!
				</p>
				{!isAuthenticated && (
					<div className='mt-6'>
						<Link
							href='/login'
							className='bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-medium mr-4 transition-colors'
						>
							Sign In to Join
						</Link>
						<Link
							href='/register'
							className='bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md font-medium transition-colors'
						>
							Create Account
						</Link>
					</div>
				)}
			</div>

			{/* Search bar */}
			<div className='bg-gray-800 p-4 rounded-lg mb-8'>
				<div className='relative'>
					<Search className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
					<input
						type='text'
						placeholder='Search topics, discussions, and users...'
						className='w-full bg-gray-700 border-gray-600 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Main content - Forum categories */}
				<div className='lg:col-span-2'>
					<div className='bg-gray-800 rounded-lg shadow-lg mb-8'>
						<div className='p-4 border-b border-gray-700 flex justify-between items-center'>
							<h2 className='text-xl font-semibold flex items-center'>
								<MessageSquare className='h-5 w-5 mr-2' />
								Forum Categories
							</h2>
							{isAuthenticated && (
								<button className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors'>
									Create New Topic
								</button>
							)}
						</div>
						<div className='divide-y divide-gray-700'>
							{forumCategories.map((category) => (
								<div
									key={category.id}
									className='p-4 hover:bg-gray-700 transition-colors'
								>
									<Link
										href={`/community/forum/${category.id}`}
										className='block'
									>
										<div className='flex items-start'>
											<div className='mt-1 mr-4'>{category.icon}</div>
											<div className='flex-1'>
												<div className='flex justify-between'>
													<h3 className='text-lg font-medium hover:text-purple-400 transition-colors'>
														{category.name}
													</h3>
													<ChevronRight className='h-5 w-5 text-gray-500' />
												</div>
												<p className='text-gray-400 text-sm mt-1'>
													{category.description}
												</p>
												<div className='flex mt-2 text-sm text-gray-500'>
													<span className='flex items-center mr-4'>
														<MessageSquare className='h-4 w-4 mr-1' />{' '}
														{category.topics} Topics
													</span>
													<span className='flex items-center'>
														<Users className='h-4 w-4 mr-1' /> {category.posts}{' '}
														Posts
													</span>
												</div>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					</div>

					{/* Trending topics */}
					<div className='bg-gray-800 rounded-lg shadow-lg'>
						<div className='p-4 border-b border-gray-700'>
							<h2 className='text-xl font-semibold flex items-center'>
								<TrendingUp className='h-5 w-5 mr-2' />
								Trending Discussions
							</h2>
						</div>
						<div className='divide-y divide-gray-700'>
							{trendingTopics.map((topic) => (
								<div
									key={topic.id}
									className='p-4 hover:bg-gray-700 transition-colors'
								>
									<Link href={`/community/topic/${topic.id}`} className='block'>
										<div className='flex justify-between items-start'>
											<div className='flex-1'>
												<div className='flex items-center'>
													<h3 className='text-md font-medium hover:text-purple-400 transition-colors'>
														{topic.title}
													</h3>
													{topic.hot && (
														<span className='ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full'>
															Hot
														</span>
													)}
												</div>
												<div className='flex mt-2 text-sm text-gray-500'>
													<span className='mr-3'>in {topic.category}</span>
													<span className='mr-3'>by {topic.author}</span>
												</div>
											</div>
											<div className='text-right text-sm text-gray-500'>
												<div className='flex items-center justify-end mb-1'>
													<MessageSquare className='h-4 w-4 mr-1' />{' '}
													{topic.replies}
													<Eye className='h-4 w-4 ml-3 mr-1' /> {topic.views}
												</div>
												<div>{topic.lastPost}</div>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
						<div className='p-4 border-t border-gray-700 text-center'>
							<Link
								href='/community/trending'
								className='text-purple-500 hover:text-purple-400 font-medium transition-colors'
							>
								View All Trending Topics
							</Link>
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className='space-y-8'>
					{/* User welcome or login prompt */}
					<div className='bg-gray-800 rounded-lg shadow-lg p-6'>
						{isAuthenticated ? (
							<div>
								<h3 className='text-lg font-semibold mb-2'>
									Welcome back, {user?.username}!
								</h3>
								<p className='text-gray-400 text-sm mb-4'>
									Ready to join the conversation?
								</p>
								<div className='grid grid-cols-2 gap-3 text-center text-sm'>
									<Link
										href='/community/notifications'
										className='bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition-colors'
									>
										Notifications
									</Link>
									<Link
										href='/community/bookmarks'
										className='bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition-colors'
									>
										Bookmarks
									</Link>
									<Link
										href='/community/my-posts'
										className='bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition-colors'
									>
										My Posts
									</Link>
									<Link
										href='/community/drafts'
										className='bg-gray-700 hover:bg-gray-600 py-2 rounded-md transition-colors'
									>
										Drafts
									</Link>
								</div>
							</div>
						) : (
							<div>
								<h3 className='text-lg font-semibold mb-2'>
									Join Our Community
								</h3>
								<p className='text-gray-400 text-sm mb-4'>
									Sign in to participate in discussions, create topics, and
									connect with other members.
								</p>
								<div className='flex justify-center space-x-3'>
									<Link
										href='/login'
										className='bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-colors'
									>
										Sign In
									</Link>
									<Link
										href='/register'
										className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium transition-colors'
									>
										Register
									</Link>
								</div>
							</div>
						)}
					</div>

					{/* Community stats */}
					<div className='bg-gray-800 rounded-lg shadow-lg p-6'>
						<h3 className='text-lg font-semibold mb-4'>Community Stats</h3>
						<div className='grid grid-cols-2 gap-4'>
							<div className='bg-gray-700 p-4 rounded-lg text-center'>
								<Users className='h-6 w-6 mx-auto mb-2 text-purple-500' />
								<span className='block text-xl font-bold'>12,458</span>
								<span className='text-gray-400 text-sm'>Members</span>
							</div>
							<div className='bg-gray-700 p-4 rounded-lg text-center'>
								<MessageSquare className='h-6 w-6 mx-auto mb-2 text-blue-500' />
								<span className='block text-xl font-bold'>87,392</span>
								<span className='text-gray-400 text-sm'>Posts</span>
							</div>
							<div className='bg-gray-700 p-4 rounded-lg text-center'>
								<TrendingUp className='h-6 w-6 mx-auto mb-2 text-green-500' />
								<span className='block text-xl font-bold'>2,804</span>
								<span className='text-gray-400 text-sm'>Topics</span>
							</div>
							<div className='bg-gray-700 p-4 rounded-lg text-center'>
								<Users className='h-6 w-6 mx-auto mb-2 text-yellow-500' />
								<span className='block text-xl font-bold'>348</span>
								<span className='text-gray-400 text-sm'>Online Now</span>
							</div>
						</div>
					</div>

					{/* Upcoming events */}
					<div className='bg-gray-800 rounded-lg shadow-lg'>
						<div className='p-4 border-b border-gray-700'>
							<h3 className='text-lg font-semibold flex items-center'>
								<Calendar className='h-5 w-5 mr-2' />
								Upcoming Events
							</h3>
						</div>
						<div className='divide-y divide-gray-700'>
							{upcomingEvents.map((event) => (
								<div
									key={event.id}
									className='p-4 hover:bg-gray-700 transition-colors'
								>
									<Link
										href={`/community/events/${event.id}`}
										className='block'
									>
										<h4 className='font-medium hover:text-purple-400 transition-colors'>
											{event.title}
										</h4>
										<div className='mt-2 text-sm text-gray-400'>
											<div className='flex items-center mb-1'>
												<Calendar className='h-4 w-4 mr-2' />
												{event.date} at {event.time}
											</div>
											<div className='flex items-center'>
												<Users className='h-4 w-4 mr-2' />
												{event.attendees} attending
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
						<div className='p-4 border-t border-gray-700 text-center'>
							<Link
								href='/community/events'
								className='text-purple-500 hover:text-purple-400 font-medium transition-colors'
							>
								View All Events
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
