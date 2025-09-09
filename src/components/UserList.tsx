import { User as UserIcon } from "lucide-react";
import { type Tables } from "@/types/database.types";

function UserList({ users }: { users: Tables<"users">[] }) {
	return (
		<ul className="flex flex-col gap-2 p-2">
			{users.map((user: Tables<"users">) => (
				<li key={user.id} className="truncate flex gap-2">
					<UserIcon />
					<span>{user.displayName}</span>
				</li>
			))}
		</ul>
	);
}

export default UserList;
