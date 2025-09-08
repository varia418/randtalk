import ToolBar from "@/components/ToolBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RoomList from "@/components/RoomList";
import UsernameDialog from "@/components/UsernameDialog";
import { useState } from "react";

function Home() {
	const [usernameDialogOpen, setUsernameDialogOpen] = useState(() => {
		// open dialog if username is not existed
		const username = sessionStorage.getItem("username");
		return !username;
	});

	const rooms = [
		{
			id: "1",
			title: "General Chat",
			creator: "Alice",
			numberOfParticipants: 5,
			createdAt: new Date(),
		},
		{
			id: "2",
			title: "Tech Talk",
			creator: "Bob",
			numberOfParticipants: 3,
			createdAt: new Date("2024-06-21T12:30:00Z"),
		},
		{
			id: "3",
			title: "Gaming Discussion",
			creator: "Charlie",
			numberOfParticipants: 8,
			createdAt: new Date("2024-06-22T09:15:00Z"),
		},
		{
			id: "4",
			title: "Music Discussion",
			creator: "Dave",
			numberOfParticipants: 6,
			createdAt: new Date("2024-06-23T11:45:00Z"),
		},
	];
	return (
		<div className="min-h-screen container mx-auto flex flex-col">
			<Header setUsernameDialogOpen={setUsernameDialogOpen} />
			<h1 className="text-6xl font-bold text-center text-primary mt-20 mb-6">
				Say Hi to Someone New
			</h1>
			<p className="text-center text-xl">
				No Sign-Up. Just Start Talking.
			</p>
			<ToolBar />
			<RoomList rooms={rooms} />
			<Footer />
			<UsernameDialog
				open={usernameDialogOpen}
				setOpen={setUsernameDialogOpen}
			/>
		</div>
	);
}

export default Home;
