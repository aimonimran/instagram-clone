import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

function MiniProfile() {
	const { data: session } = useSession();

	return (
		<div className='flex items-center justify-between mt-14 ml-10'>
			<Image
				src={session.user.image}
				alt='user'
				width={10}
				height={10}
				className='w-10 h-10 object-contain rounded-full border p-[2px]'
			/>

			<div className='flex-1 mx-4'>
				<h1 className='font-bold'>{session.user.username}</h1>
				<p className='text-sm text-gray-400'>Welcome To Instagram</p>
			</div>

			<button onClick={signOut} className='text-blue-400 font-semibold text-sm'>
				Sign Out
			</button>
		</div>
	);
}

export default MiniProfile;
