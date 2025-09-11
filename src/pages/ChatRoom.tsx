import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { type Tables } from "@/types/database.types";
import UserContext from "@/contexts/UserContext";
import ChatRoomLayout from "@/components/ChatRoomLayout";

type LoaderData = {
	room: Tables<"chat_rooms"> | null;
	messages: Tables<"messages">[];
};

function ChatRoom() {
	const { user } = useContext(UserContext);

	const navigate = useNavigate();
	const { room, messages: initialMessages } = useLoaderData() as LoaderData;

	if (!room || !user) {
		navigate("/");
		return;
	}

	return (
		<ChatRoomLayout
			room={room}
			user={user}
			initialMessages={initialMessages}
		/>
	);
}

export default ChatRoom;
