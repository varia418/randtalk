import type { User } from "@/types";
import UserContext from "./UserContext";
import { useState } from "react";

function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserProvider;
