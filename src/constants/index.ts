export const TABLES = {
	rooms: "chat_rooms",
	messages: "messages",
	users: "users",
	roomsWithParticipantsCount: "chat_rooms_with_user_count",
} as const;

export const SESSION_KEYS = {
	user: "user",
} as const;

export const BUCKET_NAME = "files";
