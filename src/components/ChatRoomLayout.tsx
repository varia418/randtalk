import { useRealtimeChat } from "@/hooks/useRealtineChat";
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
	initialUsers,
	initialMessages,
}: {
	room: Tables<"chat_rooms">;
	user: Tables<"users">;
	initialUsers: Tables<"users">[];
	initialMessages: Tables<"messages">[];
}) {
	const [isMuted, setIsMuted] = useState(false);
	const [isVideoOff, setIsVideoOff] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);

	const { messages: realtimeMessages, sendMessage } = useRealtimeChat({
		roomId: room.id,
		user: user,
	});
	const cameras = ["Camera 1", "Camera 2", "Camera 3"];

	const allUsers = [...initialUsers];
	const allMessages = useMemo(
		() =>
			[...initialMessages, ...realtimeMessages].sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
			),
		[initialMessages, realtimeMessages]
	);

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
				<UserList users={allUsers} />
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
						onClick={() => setIsMuted(!isMuted)}
					>
						{isMuted ? <MicOff /> : <Mic />}
					</Button>
					<Button
						size="icon"
						variant={"outline"}
						onClick={() => setIsVideoOff(!isVideoOff)}
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
