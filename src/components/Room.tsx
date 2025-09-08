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

function Room({
	title,
	creator,
	numberOfParticipants,
	createdAt,
}: {
	title: string;
	creator: string;
	numberOfParticipants: number;
	createdAt: Date;
}) {
	return (
		<Card className="w-full max-w-md gap-1">
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
				<Button className="bg-blue-500 hover:bg-blue-600 text-white">
					<LogIn />
					Join Room
				</Button>
			</CardFooter>
		</Card>
	);
}

export default Room;
