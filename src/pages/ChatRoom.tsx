import UserList from "@/components/UserList";
import { useLoaderData } from "react-router";

function ChatRoom() {
	const { room } = useLoaderData();
	console.log("🚀 ~ ChatRoom ~ room:", room);

	const users = [
		{ id: 1, name: "varia" },
		{ id: 2, name: "ruben" },
		{ id: 3, name: "noah" },
	];
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
			<div className="border auto-rows-max auto-cols-max">messages</div>
			<div className="border">camera list</div>
			<div className="border">input</div>
			<div className="border">controls</div>
		</div>
	);
}

export default ChatRoom;
