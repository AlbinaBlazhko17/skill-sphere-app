import { Link, Outlet } from 'react-router';
import { Icon } from '../common/Icon';

export const PlainLayout = () => {
	return (
		<div className={'relative flex h-screen items-center justify-center'}>
			<div className={'absolute top-8 left-8'}>
				<Link to={'/'}>
					<Icon name={'Logo'} className={'mx-auto h-fit w-48'} />
				</Link>
			</div>
			<main>
				<Outlet />
			</main>
		</div>
	);
};
