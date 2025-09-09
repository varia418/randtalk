import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GlobalSpinner from "./components/GlobalSpinner";
import type { Message, Room, User } from "./types";

export const router = createBrowserRouter([
	{ path: "/", Component: Home },
	{
		path: "/room/:roomId",
		loader: async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			const room: Room = {
				id: "1",
				title: "General Chat",
				creator: "Alice",
				numberOfParticipants: 5,
				createdAt: new Date(),
			};
			const users: User[] = [
				{ id: "1", displayName: "varia", roomId: "1" },
				{ id: "2", displayName: "ruben", roomId: "1" },
				{ id: "3", displayName: "noah", roomId: "1" },
			];
			const messages: Message[] = [
				{
					id: "2",
					content: "Hello, again!",
					sender: "ruben",
					roomId: "1",
					createdAt: new Date(),
				},
				{
					id: "1",
					content: "Hello, world!",
					sender: "varia",
					roomId: "1",
					createdAt: new Date(new Date().getTime() - 60000),
				},
			];
			return {
				room,
				users,
				messages,
			};
		},
		HydrateFallback: GlobalSpinner,
		Component: ChatRoom,
	},
]);
