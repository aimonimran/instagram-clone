import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Story from './Story';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

function Stories() {
	const [suggestions, setSuggestions] = useState([]);
	const { data: session } = useSession();

	useEffect(() => {
		const suggestions = [...Array(20)].map((_, i) => ({
			id: i,
			username: faker.internet.userName(),
			avatar: faker.image.avatar()
		}));

		setSuggestions(suggestions);
	}, []);

	return (
		<div className='flex space-x-2 border-gray-200 border rounded-sm mt-8 p-6 bg-white overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
			{session && <Story img={session.user.image} username={session.user.username} />}
			{suggestions.map((profile) => (
				<Story key={profile.id} img={profile.avatar} username={profile.username} />
			))}
		</div>
	);
}

export default Stories;
