import type { Tables } from "@/types/database.types";
import { File } from "lucide-react";

function ChatMessage(message: Tables<"messages">) {
	return (
		<li className="flex flex-col mx-2 my-1 text-sm break-words">
			<div className="flex items-center gap-2">
				<span className="font-bold">{message.sender}</span>
				<span className="text-xs text-gray-500">
					{new Date(message.createdAt).toLocaleString()}
				</span>
			</div>
			{message.content && <span>{message.content}</span>}
			{message.fileUrl && (
				<div className="flex items-center gap-2 p-2 border rounded-lg w-fit mt-1">
					<File className="w-6 h-6" />
					<span className="truncate">{message.fileName}</span>
				</div>
			)}
		</li>
	);
}

export default ChatMessage;
