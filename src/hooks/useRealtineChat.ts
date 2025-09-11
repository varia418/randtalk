"use client";

import { TABLES } from "@/constants";
import type { Tables } from "@/types/database.types";
import supabase from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseRealtimeChatProps {
	roomId: string;
	username: string;
}

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({ roomId, username }: UseRealtimeChatProps) {
	const [messages, setMessages] = useState<Tables<"messages">[]>([]);
	const [channel, setChannel] = useState<ReturnType<
		typeof supabase.channel
	> | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const newChannel = supabase.channel(roomId);

		newChannel
			.on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
				setMessages((current) => [
					...current,
					payload.payload as Tables<"messages">,
				]);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					setIsConnected(true);
				}
			});

		setChannel(newChannel);

		return () => {
			supabase.removeChannel(newChannel);
		};
	}, [roomId, username]);

	const sendMessage = useCallback(
		async (content: string) => {
			if (!channel || !isConnected) return;

			const message: Tables<"messages"> = {
				id: uuidv4(),
				content,
				sender: username,
				roomId: roomId,
				createdAt: new Date().toISOString(),
			};

			const { error } = await supabase
				.from(TABLES.messages)
				.insert(message);

			if (error) {
				console.log(error);
				return;
			}

			setMessages((current) => [...current, message]);
			await channel.send({
				type: "broadcast",
				event: EVENT_MESSAGE_TYPE,
				payload: message,
			});
		},
		[channel, isConnected, username, roomId]
	);

	return { messages, sendMessage, isConnected };
}
