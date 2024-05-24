"use server"
import pb, {PB_KEYS} from '@service/pocketbase';
import { parseCookie } from '@utils/cookie-utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/*
TL;DR : POCKETBASE AUTHNYA CLIENTSIDE, GOOFY BGT

future readers:
jadi pocketbase ini authenticationnya dibikin buat client side, meanwhile nextjs SSR.
workaroundny adalah dengan setting cookie sendiri, yang mereka udh siapin abstractionnya (exportToCookie)
tapi goofynya, cookienya gabisa HttpsOnly karena nanti gabisa dibaca
terus dia juga gabisa simpen sbg token aja karena gaada caranya buat dapeting authnya cuman dari token
dia siapin function buat ngedecode token jadi auth yg bisa dingertiin sama pocketbase (loadFromCookie).
tapi wtf cookienya isinya user data awkwwkwkwwk

dan saat lu logout, kalo misalnya lu apus cookienya dia bakal lead to unexpected behaviour
bisa workaroundnnya lu clear client dan server sidenya
tapi pocketbasenya sendiri reccomend setting cookie attributesnya jadi "" biar kosong, tp ga apus cookienya (wtf)

in-depth: https://github.com/pocketbase/js-sdk#authstore, baca yg nextjs
: to prevent XSS, it is recommended to configure a basic CSP for your application 🥴
*/

async function fetchData() {
	const cookieStore = cookies();
	const cookieAuth = cookieStore.get(PB_KEYS.AUTH_TOKEN);
	const parsedCookie = await parseCookie(cookieAuth)
	cookieAuth && (await pb.authStore.loadFromCookie(parsedCookie))
	const pbAuth = pb.authStore.model;
	if (pbAuth) {
		return await pb.collection(PB_KEYS.USERS).getOne(pbAuth.id);
	}
}

async function register(formData:FormData) {
	//server action
	let redirectPath;
	const user:UserRegister={
		email:formData.get('email') as string,
		name:formData.get('name') as string,
		password:formData.get('password') as string,
		passwordConfirm:formData.get('passwordConfirm') as string,
		username:formData.get('username') as string,
		emailVisibility:true
	}
	try {
		await pb.collection(PB_KEYS.USERS).create(user);
		redirectPath = '/login'
	} catch (error) {
		console.error(error)
	} finally {
		if(redirectPath){
			redirect("/login")
		}
	}
}


export { fetchData, register};
