import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GlobalSpinner from "./components/GlobalSpinner";

export const router = createBrowserRouter([
	{ path: "/", Component: Home },
	{
		path: "/room/:roomId",
		loader: async () => {
			await new Promise((resolve) => setTimeout(resolve, 3000));
			return {
				room: {
					id: "1",
					title: "General Chat",
					creator: "Alice",
					numberOfParticipants: 5,
					createdAt: new Date(),
				},
			};
		},
		HydrateFallback: GlobalSpinner,
		Component: ChatRoom,
	},
]);
