import { Mic, MicOff, User as UserIcon, Video, VideoOff } from "lucide-react";
import type { PresenceUser } from "@/types";

function UserList({ users }: { users: PresenceUser[] }) {
	return (
		<ul className="flex flex-col gap-2 p-2">
			{users.map((user) => (
				<li key={user.id} className="truncate flex items-center gap-2">
					<UserIcon className="w-5 h-5" />
					<span className="flex-1 truncate">{user.displayName}</span>

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
			))}
		</ul>
	);
}

export default UserList;
