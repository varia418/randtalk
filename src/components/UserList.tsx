import { Mic, MicOff, User as UserIcon, Video, VideoOff } from "lucide-react";
import type { PresenceUser } from "@/types";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";

function UserList({ users }: { users: PresenceUser[] }) {
	const { user: currentUser } = useContext(UserContext);
	return (
		<ul className="flex flex-col gap-2 p-2">
			{users.map((user) => {
				const isSelf = user.id === currentUser?.id;
				return (
					<li
						key={user.id}
						className={`flex items-center gap-2 truncate rounded px-2 py-1 ${
							isSelf
								? "bg-blue-100 dark:bg-slate-700 font-semibold"
								: ""
						}`}
					>
						<UserIcon className="w-5 h-5" />
						<span className="flex-1 truncate">
							{user.displayName}
						</span>

						{/* Mic status */}
						{user.micMuted ? (
							<MicOff className="w-4 h-4 text-red-500" />
						) : (
							<Mic className="w-4 h-4 text-green-500" />
						)}

						{/* Video status */}
						{user.videoOff ? (
							<VideoOff className="w-4 h-4 text-red-500" />
						) : (
							<Video className="w-4 h-4 text-green-500" />
						)}
					</li>
				);
			})}
		</ul>
	);
}

export default UserList;
