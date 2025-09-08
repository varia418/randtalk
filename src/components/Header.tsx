import { NavLink } from "react-router";

function Header() {
	return (
		<div className="flex justify-between p-4 bg-gray-800 text-white">
			<NavLink to="/" end>
				<div className="flex items-center space-x-2">
					<img src="/logo.png" className="h-8" alt="randtalk-logo" />
					<span className="text-2xl font-bold">RandTalk</span>
				</div>
			</NavLink>
			<div>Welcome, User</div>
		</div>
	);
}

export default Header;
