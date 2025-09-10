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
import type { RoomWithParticipantsCount } from "@/types";
import { useNavigate } from "react-router";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";
import supabase from "@/utils/supabase";
import { TABLES } from "@/constants";

function RoomCard({
	id,
	title,
	creator,
	numberOfParticipants,
	createdAt,
}: RoomWithParticipantsCount) {
	const { user, setUser } = useContext(UserContext);
	const navigate = useNavigate();

	async function joinRoom() {
		if (!user) return;

		const { data, error } = await supabase
			.from(TABLES.users)
			.update({ id: user.id, roomId: id })
			.eq("id", user.id)
			.select()
			.single();

		if (error) {
			console.log(error);
			return;
		}

		setUser(data);
		navigate(`/room/${id}`);
	}

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
				<Button onClick={joinRoom}>
					<LogIn />
					Join Room
				</Button>
			</CardFooter>
		</Card>
	);
}

export default RoomCard;
