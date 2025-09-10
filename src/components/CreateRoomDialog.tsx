import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { TABLES } from "@/constants";
import supabase from "@/utils/supabase";
import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

const formSchema = z.object({
	title: z.string().trim().nonempty({ message: "Title is required." }),
});

function CreateRoomDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { user } = useContext(UserContext);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!user) {
			alert("There was an error. Please refresh the page.");
			return;
		}

		const room = {
			id: uuidv4(),
			title: values.title.trim(),
			creator: user.displayName,
		};
		const { error } = await supabase.from(TABLES.rooms).insert(room);

		if (error) {
			console.log(error);
			alert("There was an error creating the room. Please try again.");
		}

		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Room</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Create
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateRoomDialog;
