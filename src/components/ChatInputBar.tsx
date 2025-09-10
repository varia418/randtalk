import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChatInput, ChatInputTextArea } from "./ui/chat-input";
import {
	EmojiPicker,
	EmojiPickerContent,
	EmojiPickerFooter,
	EmojiPickerSearch,
} from "./ui/emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useContext, useState } from "react";
import { FileUp, SendHorizontal, Smile } from "lucide-react";
import UserContext from "@/contexts/UserContext";
import supabase from "@/utils/supabase";
import { TABLES } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import type { Room } from "@/types";

const formSchema = z.object({
	message: z
		.string()
		.trim()
		.nonempty()
		.max(500, "Message must be at most 500 characters long."),
});

function ChatInputBar({ room }: { room: Room }) {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const { user } = useContext(UserContext);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const message = values.message.trim();
		const { data, error } = await supabase
			.from(TABLES.messages)
			.insert({
				id: uuidv4(),
				content: message,
				sender: user?.displayName || "Unknown",
				roomId: room.id,
			})
			.select()
			.single();

		if (error) {
			console.log(error);
		} else {
			console.log("Message sent:", data);
			form.reset();
		}
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-row items-start gap-2"
				>
					<Button variant="outline" size="icon">
						<FileUp />
					</Button>
					<FormField
						control={form.control}
						name="message"
						render={({ field }) => (
							<FormItem className="flex-1 flex">
								<FormControl>
									<ChatInput variant="unstyled" {...field}>
										<ChatInputTextArea
											className="max-h-32"
											placeholder="Type a message..."
										/>
									</ChatInput>
								</FormControl>
								<Popover
									open={isEmojiPickerOpen}
									onOpenChange={setIsEmojiPickerOpen}
								>
									<PopoverTrigger asChild>
										<Button variant="outline" size="icon">
											<Smile />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-fit p-0">
										<EmojiPicker
											className="h-[342px]"
											onEmojiSelect={({ emoji }) => {
												const currentValue =
													form.getValues(field.name);
												form.setValue(
													field.name,
													currentValue + emoji,
													{
														shouldDirty: true,
														shouldValidate: true,
													}
												);
												setIsEmojiPickerOpen(false);
											}}
										>
											<EmojiPickerSearch />
											<EmojiPickerContent />
											<EmojiPickerFooter />
										</EmojiPicker>
									</PopoverContent>
								</Popover>
							</FormItem>
						)}
					/>
					<Button size="icon" type="submit">
						<SendHorizontal />
					</Button>
				</form>
			</Form>
		</div>
	);
}

export default ChatInputBar;
