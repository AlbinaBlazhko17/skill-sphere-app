import { useAuth } from '@/libs/contexts';

export default function Home() {
	const { user } = useAuth();

	return (
		<div>
			<h1 className="text-3xl font-bold text-violet-500">
				Hello {user?.firstName}!
			</h1>
		</div>
	);
}
