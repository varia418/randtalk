import ChatInputBar from "@/components/ChatInputBar";
import ChatMessage from "@/components/ChatMessage";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import UserList from "@/components/UserList";
import { LogOut, Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { type Tables } from "@/types/database.types";

type LoaderData = {
	room: Tables<"chat_rooms"> | null;
	users: Tables<"users">[];
	messages: Tables<"messages">[];
};

function ChatRoom() {
	const [isMuted, setIsMuted] = useState(false);
	const [isVideoOff, setIsVideoOff] = useState(false);
	const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
		useState(false);
	const { room, users, messages } = useLoaderData() as LoaderData;
	const cameras = ["Camera 1", "Camera 2", "Camera 3"];

	if (!room) return null;

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
					{messages.map((message: Tables<"messages">) => (
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
				<ChatInputBar room={room} />
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
