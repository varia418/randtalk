import { useParams } from "react-router";

function ChatRoom() {
	const { roomId } = useParams();
	return <div>{`Room: ${roomId}`}</div>;
}

export default ChatRoom;
