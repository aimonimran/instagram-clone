import Image from 'next/image';

function Story({ img, username }) {
	return (
		<div>
			<Image
				src={img}
				alt='story-profile'
				width={45}
				height={45}
				className='object-contain rounded-full p-[1.5px] border-red-500 border-2 cursor-pointer hover:scale-110 transition transform duration-200 ease-out'
			/>
			<p className='truncate w-14 text-xs text-center'>{username}</p>
		</div>
	);
}

export default Story;
