// types/index.ts
import { type Tables } from "./database.types";

export type User = Tables<"users">;
export type Room = Tables<"chat_rooms">;
export type Message = Tables<"messages">;
