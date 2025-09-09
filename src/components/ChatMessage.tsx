import type { Message } from "@/types";

function ChatMessage({ content, sender, createdAt }: Message) {
	return (
		<div className="px-2">
			<div className="flex gap-2 items-baseline">
				<span className="font-bold text-primary">{sender}</span>
				<span className="text-sm text-slate-500 ">
					{createdAt.toLocaleString()}
				</span>
			</div>
			<p>{content}</p>
		</div>
	);
}

export default ChatMessage;
