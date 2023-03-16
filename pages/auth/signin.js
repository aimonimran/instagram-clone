import Header from '@/components/Header';
import { getProviders, signIn as SignIntoProvider } from 'next-auth/react';
import Image from 'next/image';

function signIn({ providers }) {
	return (
		<>
			<Header />

			<div className='flex flex-col justify-center items-center min-h-screen py-2 -mt-20 px-14 text-center'>
				<Image src='/logo-lg.png' alt='logo' width={80} height={80} className='w-80' />
				<p className='text-xs italic'>This is not a REAL APP!</p>
				<div className='mt-20'>
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button
								className='p-3 bg-blue-500 rounded-lg text-white'
								onClick={() => SignIntoProvider(provider.id, { callbackUrl: '/' })}
							>
								Sign in with {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default signIn;

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers
		}
	};
}
