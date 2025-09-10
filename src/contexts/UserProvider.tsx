import type { User } from "@/types";
import UserContext from "./UserContext";
import { useState } from "react";
import { SESSION_KEYS } from "@/constants";

function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = sessionStorage.getItem(SESSION_KEYS.user);
		return storedUser ? JSON.parse(storedUser) : null;
	});
	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
