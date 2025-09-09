import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GlobalSpinner from "./components/GlobalSpinner";
import supabase from "./utils/supabase";

export const router = createBrowserRouter([
	{ path: "/", Component: Home },
	{
		path: "/room/:roomId",
		loader: async ({ params }) => {
			// await new Promise((resolve) => setTimeout(resolve, 500));

			if (!params.roomId) {
				return {
					room: null,
					users: [],
					messages: [],
				};
			}

			const { data: room } = await supabase
				.from("chat_rooms")
				.select()
				.eq("id", params.roomId)
				.single();

			const { data: users } = await supabase
				.from("users")
				.select()
				.eq("room_id", params.roomId);

			const { data: messages } = await supabase
				.from("messages")
				.select()
				.eq("room_id", params.roomId)
				.order("created_at", { ascending: false });

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
