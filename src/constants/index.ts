const TABLES = {
	users: "users",
	rooms: "chat_rooms",
	messages: "messages",
} as const;

const SESSION_KEYS = {
	user: "user",
};

export { TABLES, SESSION_KEYS };
