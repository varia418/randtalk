import { useParams } from "react-router";

function ChatRoom() {
	const { roomId } = useParams();
	return (
		<h1 className="text-3xl font-bold underline">{`Room: ${roomId}`}</h1>
	);
}

export default ChatRoom;
