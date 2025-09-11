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
import { useRef, useState } from "react";
import { FileUp, SendHorizontal, Smile } from "lucide-react";
import FilePreview from "./FilePreview";

const formSchema = z.object({
	message: z
		.string()
		.trim()
		.max(500, "Message must be at most 500 characters long."),
});

function ChatInputBar({
	sendMessage,
}: {
	sendMessage: (content: string, file?: File | null) => void;
}) {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			message: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const message = values.message.trim();
		if (message || file) {
			sendMessage(message, file);
		}
		setFile(null);
		form.reset();
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFile(file);
		}
	};

	return (
		<div>
			{file && (
				<div className="mb-2">
					<FilePreview file={file} onClear={() => setFile(null)} />
				</div>
			)}
			<div className="flex flex-row items-start gap-2">
				<Button
					variant="outline"
					size="icon"
					type="button"
					onClick={() => fileInputRef.current?.click()}
				>
					<FileUp />
				</Button>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: "none" }}
					onChange={handleFileChange}
				/>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex-1 flex flex-row items-start gap-2"
					>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem className="flex-1 flex">
									<FormControl>
										<ChatInput variant="unstyled" {...field} onSubmit={form.handleSubmit(onSubmit)}>
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
		</div>
	);
}

export default ChatInputBar;
