import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, LogIn, User, Users } from "lucide-react";
import TimeAgo from "react-timeago";
import type { Room } from "@/types";
import { NavLink } from "react-router";

function ChatRoom({
	id,
	title,
	creator,
	numberOfParticipants,
	createdAt,
}: Room) {
	return (
		<Card className="gap-0">
			<CardHeader>
				<CardTitle className="text-2xl">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex gap-4">
					<span className="flex gap-2">
						<User />
						{creator}
					</span>
					<span className="flex gap-2">
						<Users />
						{numberOfParticipants}
					</span>
					<span className="flex gap-2">
						<Clock />
						<TimeAgo date={createdAt} />
					</span>
				</div>
			</CardContent>
			<CardFooter className="mt-4">
				<NavLink to={`/room/${id}`} end>
					<Button>
						<LogIn />
						Join Room
					</Button>
				</NavLink>
			</CardFooter>
		</Card>
	);
}

export default ChatRoom;
