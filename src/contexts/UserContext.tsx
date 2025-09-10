import type { User } from "@/types";
import { createContext } from "react";

const UserContext = createContext<{
	user: User | null;
	setUser: (user: User | null) => void;
}>({
	user: null,
	setUser: () => {},
});
export default UserContext;
