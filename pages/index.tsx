import { FC } from 'react';
import 'twin.macro';
import { StyledHeroSVG } from '../styles/index';
import Link from 'next/link';

const IndexPage: FC = () => {
	return (
		<>
			<div tw='py-6 lg:px-96 flex w-full items-center bg-brand-gray-500 text-white'>
				<header>
					<h2 tw='text-3xl font-semibold'>
						<Link href='/'>
							<a>Pare Down</a>
						</Link>
					</h2>
				</header>
				<nav tw='ml-12 flex items-center flex-1'>
					<ul tw='flex font-medium'>
						<li tw='mr-4 hover:underline'>
							<a href='#features'>Features</a>
						</li>
						<li tw='mr-4 hover:underline'>
							<a href='#pricing'>Pricing</a>
						</li>
						<li tw='hover:underline'>
							<a href='https://github.com/datguysheepy/pare-down'>Github</a>
						</li>
					</ul>
					<Link href='/dashboard'>
						<a tw='ml-auto'>
							<button tw='self-end justify-self-end border-brand-blue border-solid border rounded px-4 font-semibold hover:bg-brand-blue'>
								Go to the app
							</button>
						</a>
					</Link>
				</nav>
			</div>
			<div>
				<div tw='w-full lg:px-96 pt-32 pb-64 text-center flex flex-col relative bg-brand-gray-500 text-white'>
					<h1 tw='text-7xl font-bold tracking-wide leading-relaxed'>Pare Down for Spotify</h1>
					<p tw='text-2xl'>Easy and fast way to duplicate your playlists with a reduced number of songs.</p>

					<Link href='/dashboard'>
						<a>
							<button tw='mt-8 bg-brand-blue flex-grow-0 self-start mx-auto py-3 px-8 text-lg font-bold shadow-md hover:bg-brand-blue-600 rounded'>
								Log in with Spotify
							</button>
						</a>
					</Link>

					<StyledHeroSVG>
						<svg
							data-name='Layer 1'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 1200 120'
							preserveAspectRatio='none'
						>
							<path
								d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z'
								className='shape-fill'
							></path>
						</svg>
					</StyledHeroSVG>
				</div>

				<div id='features' tw='pt-10 pb-24 w-full lg:px-96'>
					<h3 tw='text-center text-3xl font-bold mb-10 tracking-wide'>Features & Pricing:</h3>
					<div tw='grid grid-cols-4 gap-x-12'>
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded'>
							<h5 tw='flex items-center justify-center'>
								<svg
									tw='w-6 h-6 mr-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
									></path>
								</svg>
								<span tw='text-lg font-semibold'>Duplicate Playlists</span>
							</h5>
							<p tw='text-center py-8'>
								Just with a few clicks you can create copy of your playlist with a reduced number of songs selected by
								you.
							</p>
						</div>
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded'>
							<h5 tw='flex items-center justify-center'>
								<svg
									tw='w-6 h-6 mr-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
									/>
								</svg>
								<span tw='text-lg font-semibold leading-tight'>Edit & Delete</span>
							</h5>
							<p tw='text-center py-8'>
								PareDown also comes with a functionality to edit and delete selected playlists. Managing your music
								library was never easier!
							</p>
						</div>
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded '>
							<h5 tw='flex items-center justify-center'>
								<svg
									tw='w-6 h-6 mr-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
									/>
								</svg>
								<span tw='text-lg font-semibold leading-tight'>Actively Developed</span>
							</h5>
							<p tw='text-center py-8'>
								As always with all my projects - PareDown is a tool that I personally and often use so it&apos;s in my
								best interest to fix and improve this app.
							</p>
						</div>
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded '>
							<h5 tw='flex items-center justify-center'>
								<svg
									tw='w-6 h-6 mr-2'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
									/>
								</svg>
								<span tw='text-lg font-semibold leading-tight'>Open-source</span>
							</h5>
							<p tw='py-8 text-center'>
								Each of us should be interested in our privacy on the web, and nothing is better than open-source
								projects which allows us to check how and whether our data is used.
							</p>
						</div>
					</div>

					<div tw='w-full mt-20 grid grid-cols-2 gap-x-12'>
						<div tw='px-7 font-bold text-xl leading-relaxed flex items-center'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora velit sint rerum molestias nulla. Officia
							aut magnam, libero dolorum esse, expedita quasi eius voluptatem vero nobis vel odit laborum ducimus id
							eum.
						</div>

						<div tw='px-7 pt-9 rounded border border-solid border-gray-300 flex items-center flex-col relative'>
							<div tw='absolute -right-8 -top-4 bg-brand-blue flex text-white font-bold px-4 py-1 rounded-sm text-sm rotate-12 transform shadow'>
								BEST DEAL!
							</div>

							<h5 tw='text-6xl mb-2'>$0</h5>
							<h6 tw='leading-relaxed font-semibold'>the entire app is free for use, forever*</h6>

							<span tw='text-xs mt-8 pb-4 text-gray-500'>
								* for as long as I plan to support and develop this project.
							</span>
						</div>
					</div>
				</div>
			</div>
			<footer tw='w-full bg-gray-50 lg:px-96 mt-12 py-4 text-center font-semibold text-sm text-gray-900'>
				Made with ❤️ by
				<a href='https://github.com/datguysheepy/pare-down'> @datguysheepy</a>
			</footer>
		</>
	);
};

export default IndexPage;
