import type { RoomWithParticipantsCount } from "@/types";
import RoomCard from "./RoomCard";

function RoomList({ rooms }: { rooms: RoomWithParticipantsCount[] }) {
	return (
		<div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-stretch gap-4">
			{rooms.map((room) => (
				<RoomCard key={room.id} {...room} />
			))}
		</div>
	);
}

export default RoomList;
