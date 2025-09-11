import ChatInputBar from "@/components/ChatInputBar";
import ChatMessage from "@/components/ChatMessage";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import UserList from "@/components/UserList";
import { LogOut, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { type Tables } from "@/types/database.types";
import { useRealtimeChat } from "@/hooks/useRealtineChat";
import UserContext from "@/contexts/UserContext";

type LoaderData = {
	room: Tables<"chat_rooms"> | null;
	users: Tables<"users">[];
	messages: Tables<"messages">[];
};

function ChatRoom() {
	const { user } = useContext(UserContext);
	const [isMuted, setIsMuted] = useState(false);
	const [isVideoOff, setIsVideoOff] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const navigate = useNavigate();
	const {
		room,
		users: initialUsers,
		messages: initialMessages,
	} = useLoaderData() as LoaderData;
	const { messages: realtimeMessages, sendMessage } = useRealtimeChat({
		roomId: room?.id || "",
		username: user?.displayName || "User",
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

	if (!room) {
		navigate("/");
		return;
	}

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

export default ChatRoom;
