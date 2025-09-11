"use client";

import { TABLES } from "@/constants";
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
			.on("presence", { event: "sync" }, () => {
				const presence = newChannel.presenceState();
				console.log("Current presence state:", presence);
			})
			.subscribe(async (status) => {
				if (status === "SUBSCRIBED") {
					setIsConnected(true);

					const userState = {
						userId: user.id,
						isMicMuted: true,
						isVideoOff: true,
					};

					const presenceTrackStatus = await newChannel.track(
						userState
					);
					console.log(
						"🚀 ~ useRealtimeChat ~ presenceTrackStatus:",
						presenceTrackStatus
					);
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

	return { messages, sendMessage, isConnected };
}
