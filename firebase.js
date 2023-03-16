import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCfUm8waMzllLYs691pmEm3BbRAeo-FeiY',
	authDomain: 'instagram-clone-f7bea.firebaseapp.com',
	projectId: 'instagram-clone-f7bea',
	storageBucket: 'instagram-clone-f7bea.appspot.com',
	messagingSenderId: '853034537985',
	appId: '1:853034537985:web:c7083e3bdecfff28b41c00'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
