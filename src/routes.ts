import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";

export const router = createBrowserRouter([
	{ path: "/", Component: Home },
	{ path: "/room/:roomId", Component: ChatRoom },
]);
