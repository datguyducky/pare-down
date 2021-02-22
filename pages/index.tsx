import { FC, useState } from 'react';
import tw from 'twin.macro';
import { StyledHeroSVG } from '../styles/index';
import Link from 'next/link';
import { useRouter } from 'next/router';

const IndexPage: FC = () => {
	const router = useRouter();
	const [mobileNav, setMobileNav] = useState<boolean>(false);

	return (
		<>
			<div tw='py-6 px-4 3xl:px-96 flex w-full items-center bg-bgray text-white'>
				<header>
					<h2 tw='text-xl lg:text-3xl font-semibold'>
						<Link href='/'>
							<a>Pare Down</a>
						</Link>
					</h2>
				</header>
				<nav tw='ml-12 items-center flex-1 hidden lg:flex'>
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
							<button tw='self-end justify-self-end border-bblue border-solid border rounded px-4 font-semibold hover:bg-bblue'>
								Go to the app
							</button>
						</a>
					</Link>
				</nav>
				<nav tw='ml-auto lg:hidden'>
					<button onClick={() => setMobileNav(true)}>
						<svg tw='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
						</svg>
					</button>
					<div
						tw='fixed inset-0 bg-bgray-darkest items-center justify-center text-white z-50 hidden'
						css={[mobileNav && tw`flex`]}
						onClick={() => setMobileNav(false)}
					>
						<button
							tw='absolute top-0 right-0 mt-6 mr-4 text-white text-opacity-80 hover:text-opacity-100'
							onClick={() => setMobileNav(false)}
						>
							<svg
								tw='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
						<ul tw='flex flex-col font-medium text-4xl'>
							<li tw='mb-6 hover:underline'>
								<a href='#features'>Features</a>
							</li>
							<li tw='mb-6 hover:underline'>
								<a href='#pricing'>Pricing</a>
							</li>
							<li tw='hover:underline'>
								<a href='https://github.com/datguysheepy/pare-down'>Github</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<div>
				<div tw='w-full py-10 pb-24 px-4 lg:pt-32 lg:pb-64 3xl:px-96 text-center flex flex-col relative bg-bgray text-white'>
					<h1 tw='text-3xl mb-4 lg:text-7xl lg:mb-0 font-bold lg:tracking-wide lg:leading-relaxed'>
						Pare Down for Spotify
					</h1>
					<p tw='text-lg lg:text-2xl'>Easy and fast way to duplicate your playlists with a reduced number of songs.</p>

					<button
						tw='mt-8 bg-bblue flex-grow-0 self-start mx-auto py-3 px-4 lg:px-8 lg:text-lg font-bold shadow-md hover:bg-bblue-dark rounded'
						onClick={() => router.push('/dashboard')}
					>
						Log in with Spotify
					</button>

					<StyledHeroSVG tw='hidden xl:block'>
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

				<div id='features' tw='pt-10 lg:pb-24 w-full px-4 3xl:px-96'>
					<h3 tw='text-center text-2xl lg:text-3xl font-bold mb-10 tracking-wide'>Features & Pricing:</h3>
					<div tw='flex flex-col space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-12 items-center'>
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded max-w-lg lg:h-full'>
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
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded max-w-lg lg:h-full'>
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
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded max-w-lg lg:h-full'>
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
						<div tw='border-solid border border-gray-300 py-9 px-7 rounded max-w-lg lg:h-full'>
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

					<div
						tw='w-full mt-24 lg:mt-20 flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-12 max-w-lg lg:max-w-none mx-auto'
						id='pricing'
					>
						<div tw='mb-12 lg:mb-0 text-center lg:px-7 font-bold text-lg lg:text-xl leading-relaxed flex items-center'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora velit sint rerum molestias nulla. Officia
							aut magnam, libero dolorum esse, expedita quasi eius voluptatem vero nobis vel odit laborum ducimus id
							eum.
						</div>

						<div tw='px-7 pt-9 rounded border border-solid border-gray-300 flex items-center flex-col relative'>
							<div tw='absolute 3xl:-right-8 -top-4 bg-bblue flex text-white font-bold px-4 py-1 rounded-sm text-sm 3xl:transform 3xl:rotate-12 shadow'>
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
			<footer tw='w-full bg-gray-50 3xl:px-96 mt-12 py-4 text-center font-semibold text-sm text-gray-900'>
				Made with ❤️ by
				<a href='https://github.com/datguysheepy/pare-down'> @datguysheepy</a>
			</footer>
		</>
	);
};

export default IndexPage;
//
