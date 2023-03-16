import Head from 'next/head';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Feed from '@/components/Feed';
import Modal from './../components/Modal';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<div className='h-screen overflow-y-scroll scrollbar-hide bg-gray-50'>
			<Head>
				<title>Instagram Clone</title>
				<meta name='description' content='Instagram Clone' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<Feed />
			<Modal />
		</div>
	);
}
