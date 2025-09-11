import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import GlobalSpinner from "./components/GlobalSpinner";
import supabase from "./utils/supabase";
import { TABLES } from "./constants";

export const router = createBrowserRouter([
	{
		path: "/",
		loader: async ({ request }) => {
			const url = new URL(request.url);
			const sort = url.searchParams.get("sort") || "recent";

			const { data } = await supabase
				.from(TABLES.roomsWithParticipantsCount)
				.select("*")
				.order(
					sort === "popular" ? "participants_count" : "createdAt",
					{
						ascending: false,
					}
				);

			const rooms = data?.map((room) => ({
				...room,
				numberOfParticipants: room.participants_count,
			}));
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

			const { data: messages } = await supabase
				.from(TABLES.messages)
				.select()
				.eq("roomId", params.roomId)
				.order("createdAt", { ascending: false });

			return {
				room,
				messages,
			};
		},
		HydrateFallback: GlobalSpinner,
		Component: ChatRoom,
	},
]);
