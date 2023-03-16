import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	secret: 'b3b4c1a70c2b6d904ff342ac7a0fa499',
	pages: {
		signIn: '/auth/signin'
	},
	callbacks: {
		async session({ user, token, session }) {
			session.user.username = session.user.name.split(' ').join('').toLocaleLowerCase();
			session.user.uid = token.sub;

			return session;
		}
	}
};

export default NextAuth(authOptions);
