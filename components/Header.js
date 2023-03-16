import Image from 'next/image';
import {
	MagnifyingGlassIcon,
	Bars3Icon,
	PaperAirplaneIcon,
	PlusCircleIcon,
	UserGroupIcon,
	HeartIcon
} from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '@/atoms/modalAtom';

function Header() {
	const { data: session } = useSession();
	const [open, setOpen] = useRecoilState(modalState);
	const router = useRouter();

	return (
		<div className='shadow-sm bg-white border-b sticky z-50 top-0'>
			<div className='flex max-w-6xl justify-between items-center mx-5 lg:mx-auto'>
				<div
					onClick={() => router.push('/')}
					className='relative hidden lg:inline-grid cursor-pointer'
				>
					<Image
						src='/logo-lg.png'
						alt='logo'
						width={24}
						height={24}
						className='object-contain w-24 h-12'
					/>
				</div>
				<div
					onClick={() => router.push('/')}
					className='relative lg:hidden flex-shrink-0 cursor-pointer'
				>
					<Image
						src='/logo.png'
						alt='logo'
						width={10}
						height={10}
						className='object-contain w-8 h-8'
					/>
				</div>

				<div className='max-w-xs ml-3 md:ml-0'>
					<div className='relative flex mt-1 mb-1 rounded-md'>
						<div className='absolute flex items-center pl-3 inset-y-0 pointer-events-none'>
							<MagnifyingGlassIcon className='h-5 w-5 text-gray-300' />
						</div>
						<input
							className='w-full pl-10 block bg-gray-50 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md'
							type='text'
							placeholder='Search...'
						/>
					</div>
				</div>

				<div className='flex space-x-3 items-center'>
					<HomeIcon onClick={() => router.push('/')} className='navBtn' />
					<Bars3Icon className='h-10 sm:h-6 md:hidden cursor-pointer' />

					{session ? (
						<>
							<div className='relative navBtn'>
								<PaperAirplaneIcon className='navBtn -rotate-45' />
								<div className='absolute -top-1 -right-2 bg-red-500 w-5 h-5 flex justify-center items-center rounded-full text-white text-xs animate-pulse'>
									3
								</div>
							</div>
							<PlusCircleIcon onClick={() => setOpen(true)} className='navBtn' />
							<UserGroupIcon className='navBtn' />
							<HeartIcon className='navBtn' />
							<Image
								onClick={signOut}
								src={session.user.image}
								alt='profile-pic'
								width={10}
								height={10}
								className='h-10 w-10 rounded-full cursor-pointer object-contain'
							/>
						</>
					) : (
						<button onClick={signIn}>Sign In</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
