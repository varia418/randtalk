import { NavLink } from "react-router";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

function Header({
	setUsernameDialogOpen,
}: {
	setUsernameDialogOpen: (open: boolean) => void;
}) {
	const username = sessionStorage.getItem("username") || "User";

	const openUsernameDialog = () => {
		setUsernameDialogOpen(true);
	};
	return (
		<div className="flex justify-between p-4 text-white">
			<NavLink to="/" end>
				<div className="flex items-center space-x-2">
					<img src="/logo.png" className="h-8" alt="randtalk-logo" />
					<span className="text-2xl font-bold">RandTalk</span>
				</div>
			</NavLink>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex gap-1 cursor-pointer">
						<span>Welcome, </span>
						<span className="text-blue-500">{username}</span>
						<ChevronDown className="text-blue-500" />
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56">
					<DropdownMenuItem onClick={openUsernameDialog}>
						Change Username
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export default Header;
