import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../lib/context/auth-context';
import { saveUserLastLocation } from '../../lib/helper-functions/user-auth';
import Spinner from '../ui/Spinner';
import Router from 'next/router'
import SignInUI from './SignInUI';

// Component's children only shown to logged-in users
export default function AuthCheck(props: any) {
	const { user, userLoading } = useContext(UserContext);

	useEffect(() => {
		saveUserLastLocation(Router.asPath.toString())
	}, [])

	if (userLoading && !user){
		return <Spinner show />
	}

	return (
		(user && !userLoading) ? props.children : (props.fallback || (
			<SignInUI />
		))
	);
}