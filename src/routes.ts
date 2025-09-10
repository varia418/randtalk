import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GlobalSpinner from "./components/GlobalSpinner";
import supabase from "./utils/supabase";
import { TABLES } from "./constants";

export const router = createBrowserRouter([
	{
		path: "/",
		loader: async () => {
			const { data } = await supabase
				.from(TABLES.rooms)
				.select(`*, users(count)`)
				.order("createdAt", { ascending: false });
			const rooms = data?.map((room) => ({
				...room,
				numberOfParticipants: room.users?.[0]?.count || 0,
			}));
			console.log(rooms);
			return { rooms };
		},
		Component: Home,
	},
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
				.from(TABLES.rooms)
				.select()
				.eq("id", params.roomId)
				.single();

			const { data: users } = await supabase
				.from(TABLES.users)
				.select()
				.eq("roomId", params.roomId);

			const { data: messages } = await supabase
				.from(TABLES.messages)
				.select()
				.eq("roomId", params.roomId)
				.order("createdAt", { ascending: false });

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
