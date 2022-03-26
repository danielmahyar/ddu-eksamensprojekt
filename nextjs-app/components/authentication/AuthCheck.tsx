import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/auth-context';
import Spinner from '../ui/Spinner';

// Component's children only shown to logged-in users
export default function AuthCheck(props: any) {
	const { user, userLoading } = useContext(UserContext);
	console.log(user)

	if (userLoading){
		return <Spinner show />
	}

	return (
		(user) ? props.children : props.fallback || <Link href="/enter">You must be signed in</Link>
	);
}