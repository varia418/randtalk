import { useRealtimeChat } from "@/hooks/useRealtimeChat";
import type { Tables } from "@/types/database.types";
import { useMemo, useState } from "react";
import UserList from "./UserList";
import ChatMessage from "./ChatMessage";
import ChatInputBar from "./ChatInputBar";
import { Button } from "./ui/button";
import { LogOut, Mic, MicOff, Video, VideoOff } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";

function ChatRoomLayout({
	room,
	user,
	initialMessages,
}: {
	room: Tables<"chat_rooms">;
	user: Tables<"users">;
	initialMessages: Tables<"messages">[];
}) {
	const [isMuted, setIsMuted] = useState(true);
	const [isVideoOff, setIsVideoOff] = useState(true);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);

	const {
		messages: realtimeMessages,
		sendMessage,
		users,
		updatePresence,
	} = useRealtimeChat({
		roomId: room.id,
		user: user,
	});
	const cameras = ["Camera 1", "Camera 2", "Camera 3"];

	const allMessages = useMemo(
		() =>
			[...initialMessages, ...realtimeMessages].sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			),
		[initialMessages, realtimeMessages]
	);

	const toggleMute = () => {
		const newState = !isMuted;
		setIsMuted(newState);
		updatePresence(newState, isVideoOff);
	};

	const toggleVideo = () => {
		const newState = !isVideoOff;
		setIsVideoOff(newState);
		updatePresence(isMuted, newState);
	};

	return (
		<div className="h-screen grid grid-rows-[50px_minmax(300px,1fr)_fit-content(0)] grid-cols-[200px_minmax(400px,1fr)_400px]">
			<div className="border px-2 flex items-center">
				<h1 className="text-2xl truncate">User List</h1>
			</div>
			<div className="border px-2 flex items-center min-w-0">
				<h1 className="text-2xl truncate">{room.title}</h1>
			</div>
			<div className="border px-2 flex items-center">
				<h1 className="text-2xl truncate">Cameras</h1>
			</div>
			<div className="border row-span-2 overflow-auto">
				<UserList users={users} />
			</div>
			<div className="border pb-2">
				<ul className="flex flex-col-reverse overflow-auto h-full">
					{allMessages.map((message: Tables<"messages">) => (
						<ChatMessage key={message.id} {...message} />
					))}
				</ul>
			</div>
			<div className="border overflow-auto">
				<div className="grid grid-cols-2 justify-items-center">
					{cameras.map((camera, index) => (
						<div
							key={index}
							className="border m-2 p-2 size-40 flex items-center justify-center"
						>
							{camera}
						</div>
					))}
				</div>
			</div>
			<div className="border p-2">
				<ChatInputBar sendMessage={sendMessage} />
			</div>
			<div className="border">
				<div className="flex items-center justify-center gap-2 p-2">
					<Button
						size="icon"
						variant={"outline"}
						onClick={toggleMute}
					>
						{isMuted ? <MicOff /> : <Mic />}
					</Button>
					<Button
						size="icon"
						variant={"outline"}
						onClick={toggleVideo}
					>
						{isVideoOff ? <VideoOff /> : <Video />}
					</Button>
					<Button
						size="icon"
						variant={"destructive"}
						onClick={() => setIsConfirmationDialogOpen(true)}
					>
						<LogOut />
					</Button>
				</div>
			</div>
			<ConfirmationDialog
				open={isConfirmationDialogOpen}
				setOpen={setIsConfirmationDialogOpen}
			/>
		</div>
	);
}

export default ChatRoomLayout;
