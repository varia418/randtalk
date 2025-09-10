import type { Tables } from "@/types/database.types";

function ChatMessage({ content, sender, createdAt }: Tables<"messages">) {
	return (
		<div className="px-2">
			<div className="flex gap-2 items-baseline">
				<span className="font-bold text-primary">{sender}</span>
				<span className="text-sm text-slate-500 ">
					{new Date(createdAt).toLocaleString()}
				</span>
			</div>
			<p>{content}</p>
		</div>
	);
}

export default ChatMessage;
