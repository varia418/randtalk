import ChatMessage from "@/components/ChatMessage";
import UserList from "@/components/UserList";
import type { Message } from "@/types";
import { useLoaderData } from "react-router";

function ChatRoom() {
	const { room, users, messages } = useLoaderData();
	const cameras = ["Camera 1", "Camera 2", "Camera 3"];

	return (
		<div className="min-h-screen grid grid-rows-[50px_minmax(300px,1fr)_100px] grid-cols-[200px_minmax(400px,1fr)_400px]">
			<div className="border px-2 flex items-center">
				<h1 className="text-2xl truncate">User List</h1>
			</div>
			<div className="border px-2 flex items-center min-w-0">
				<h1 className="text-2xl truncate">
					{room.title} (ID: {room.id})
				</h1>
			</div>
			<div className="border px-2 flex items-center">
				<h1 className="text-2xl truncate">Cameras</h1>
			</div>
			<div className="border row-span-2">
				<UserList users={users} />
			</div>
			<div className="border auto-rows-max auto-cols-max pb-2">
				<ul className="flex flex-col justify-end overflow-y-auto h-full">
					{messages.map((message: Message) => (
						<ChatMessage key={message.id} {...message} />
					))}
				</ul>
			</div>
			<div className="border">
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
			<div className="border">input</div>
			<div className="border">controls</div>
		</div>
	);
}

export default ChatRoom;
