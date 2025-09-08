import type { Room } from "@/types";
import ChatRoom from "./ChatRoom";

function RoomList({ rooms }: { rooms: Room[] }) {
	return (
		<div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-stretch gap-4">
			{rooms.map((room) => (
				<ChatRoom key={room.id} {...room} />
			))}
		</div>
	);
}

export default RoomList;
