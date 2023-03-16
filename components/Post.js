import { useSession } from 'next-auth/react';
import {
	addDoc,
	collection,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
	setDoc,
	doc,
	deleteDoc
} from 'firebase/firestore';
import {
	EllipsisHorizontalIcon,
	HeartIcon,
	ChatBubbleBottomCenterIcon,
	BookmarkIcon,
	PaperAirplaneIcon,
	FaceSmileIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useState, useEffect, useRef } from 'react';
import { db } from '@/firebase';
import Moment from 'react-moment';
import Image from 'next/image';

function Post({ id, username, userImg, img, caption }) {
	const { data: session } = useSession();
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState([]);
	const [hasLiked, setHasLiked] = useState(false);
	const commentRef = useRef();

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')),
				(snapshot) => {
					setComments(snapshot.docs);
				}
			),
		[db, id]
	);

	useEffect(
		() =>
			onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) => {
				setLikes(snapshot.docs);
			}),
		[db, id]
	);

	useEffect(
		() => setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1),
		[likes]
	);

	const likePost = async () => {
		if (hasLiked) {
			await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
		} else {
			await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
				username: session.user.username
			});
		}
	};

	const sendComment = async (e) => {
		e.preventDefault();

		const commentToSend = comment;
		setComment('');

		await addDoc(collection(db, 'posts', id, 'comments'), {
			comment: commentToSend,
			username: session.user.username,
			userImg: session.user.image,
			timestamp: serverTimestamp()
		});
	};

	return (
		<div className='bg-white my-7 border rounded-sm'>
			{/* Header */}
			<div className='flex items-center p-5'>
				<Image
					className='object-contain h-12 w-12 rounded-full p-1 border mr-3 cursor-pointer'
					src={userImg}
					alt='user'
					width={12}
					height={12}
				/>
				<p className='flex-1 font-bold text-sm'>{username}</p>
				<EllipsisHorizontalIcon className='h-6 cursor-pointer' />
			</div>

			{/* Image */}
			<img className='object-cover w-full' src={img} alt='img' />

			{/* Buttons */}
			{session && (
				<div className='flex justify-between pt-4 px-4'>
					<div className='flex space-x-4'>
						{hasLiked ? (
							<FilledHeartIcon onClick={likePost} className='btn' color='red' />
						) : (
							<HeartIcon onClick={likePost} className='btn' />
						)}
						<ChatBubbleBottomCenterIcon
							onClick={() => commentRef.current.focus()}
							className='btn'
						/>
						<PaperAirplaneIcon className='btn' />
					</div>
					<BookmarkIcon className='btn' />
				</div>
			)}

			{/* Caption */}
			<div className='p-5 truncate'>
				{likes.length > 0 && (
					<p className='font-semibold mb-1'>
						{likes.length} {likes.length === 1 ? 'like' : 'likes'}
					</p>
				)}
				<span className='font-bold mr-1'>{username} </span>
				{caption}
			</div>

			{/* Comments */}
			{comments.length > 0 && (
				<div className='ml-10 h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-black'>
					{comments.map((comment) => (
						<div key={comment.id} className='relative flex items-center space-x-2 mb-3'>
							<Image
								className='h-7 w-7 rounded-full object-contain'
								width={7}
								height={7}
								src={comment.data().userImg}
								alt='profile'
							/>
							<p className='text-sm flex-1'>
								<span className='font-bold'>{comment.data().username}</span>{' '}
								{comment.data().comment}
							</p>
							<Moment fromNow className='right-3 absolute text-xs text-gray-500'>
								{comment.data().timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}

			{/* Input */}
			{session && (
				<div className='flex p-4 items-center'>
					<FaceSmileIcon className='h-7' />
					<input
						ref={commentRef}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className='flex-1 border-none focus:ring-0 outline-none'
						type='text'
						placeholder='Add a comment...'
					/>
					<button
						disabled={!comment.trim()}
						onClick={sendComment}
						type='submit'
						className='font-semibold text-blue-400'
					>
						Post
					</button>
				</div>
			)}
		</div>
	);
}

export default Post;
