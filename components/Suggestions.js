import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

function Suggestions() {
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		const suggestions = [...Array(5)].map((_, i) => ({
			id: i,
			username: faker.internet.userName(),
			avatar: faker.image.avatar(),
			company: faker.company.name()
		}));

		setSuggestions(suggestions);
	}, []);

	return (
		<div className='mt-4 ml-10'>
			<div className='flex justify-between text-sm mb-5'>
				<h1 className='font-bold text-gray-400'>Suggestions for you</h1>
				<button className='font-semibold text-gray-600'>See All</button>
			</div>

			{suggestions.map((profile) => (
				<div key={profile.id} className='flex items-center justify-center mt-3'>
					<Image
						src={profile.avatar}
						alt='avatar'
						width={10}
						height={10}
						className='w-10 h-10 object-contain rounded-full border p-[2px]'
					/>

					<div className='flex-1 ml-4'>
						<h1 className='font-semibold text-sm'>{profile.username}</h1>
						<p className='text-xs text-gray-400'>Works at {profile.company}</p>
					</div>

					<button className='text-xs text-blue-400 font-bold'>Follow</button>
				</div>
			))}
		</div>
	);
}

export default Suggestions;
