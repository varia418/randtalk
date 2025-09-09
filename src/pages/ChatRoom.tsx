import { useParams } from "react-router";

function ChatRoom() {
	const { roomId } = useParams();
	return (
		<div className="min-h-screen grid grid-rows-[50px_1fr_100px] grid-cols-[200px_1fr_500px]">
			<div className="border">User List</div>
			<div className="border">GOTY watchalong</div>
			<div className="border">Cameras</div>
			<div className="border row-span-2">
				<ul>
					<li>varia</li>
					<li>ruben</li>
					<li>noah</li>
				</ul>
			</div>
			<div className="border auto-rows-max auto-cols-max">messages</div>
			<div className="border">camera list</div>
			<div className="border">input</div>
			<div className="border">controls</div>
		</div>
	);
}

export default ChatRoom;