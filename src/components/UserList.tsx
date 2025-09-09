import type { User } from "@/types";
import { User as UserIcon } from "lucide-react";

function UserList({ users }: { users: User[] }) {
	return (
		<ul className="flex flex-col gap-2 p-2">
			{users.map((user: User) => (
				<li key={user.id} className="truncate flex gap-2">
					<UserIcon />
					<span>{user.displayName}</span>
				</li>
			))}
		</ul>
	);
}

export default UserList;
