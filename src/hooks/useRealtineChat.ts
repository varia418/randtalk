"use client";

import { TABLES } from "@/constants";
import type { PresenceUser } from "@/types";
import type { Tables } from "@/types/database.types";
import supabase from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UseRealtimeChatProps {
	roomId: string;
	user: Tables<"users">;
}

const EVENT_MESSAGE_TYPE = "message";

export function useRealtimeChat({ roomId, user }: UseRealtimeChatProps) {
	const [messages, setMessages] = useState<Tables<"messages">[]>([]);
	const [users, setUsers] = useState<PresenceUser[]>([]);
	const [channel, setChannel] = useState<ReturnType<
		typeof supabase.channel
	> | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const newChannel = supabase.channel(roomId, {
			config: {
				presence: { key: user.id },
			},
		});

		newChannel
			.on("broadcast", { event: EVENT_MESSAGE_TYPE }, (payload) => {
				setMessages((current) => [
					...current,
					payload.payload as Tables<"messages">,
				]);
			})
			.on("presence", { event: "sync" }, () => {
				const state = newChannel.presenceState();
				const onlineUsers: PresenceUser[] = Object.values(state)
					.flat()
					.map((presence: any) => ({
						...presence.user,
						micMuted: presence.micMuted,
						videoOff: presence.videoOff,
					}));
				setUsers(onlineUsers);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					setIsConnected(true);

					await newChannel.track({
						user,
						micMuted: true,
						videoOff: true,
					});
				}
			});

		setChannel(newChannel);

		return () => {
			supabase.removeChannel(newChannel);
		};
	}, [roomId, user]);

	const sendMessage = useCallback(
		async (content: string) => {
			if (!channel || !isConnected) return;

			const message: Tables<"messages"> = {
				id: uuidv4(),
				content,
				sender: user.displayName,
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
		[channel, isConnected, user, roomId]
	);

	const updatePresence = useCallback(
		async (micMuted: boolean, videoOff: boolean) => {
			await channel?.track({
				user,
				micMuted,
				videoOff,
			});
		},
		[user, channel]
	);

	return { messages, sendMessage, users, updatePresence };
}
