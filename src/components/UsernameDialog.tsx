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
import supabase from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { TABLES } from "@/constants";
import UserContext from "@/contexts/UserContext";
import { useContext } from "react";

const formSchema = z.object({
	username: z.string().trim().min(2, {
		message: "Username must be at least 2 characters.",
	}),
});

function UsernameDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const { user, setUser } = useContext(UserContext);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const username = values.username.trim();

		const { data, error } = await supabase
			.from(TABLES.users)
			.upsert({ id: user?.id || uuidv4(), displayName: username })
			.select()
			.single();

		if (data) {
			setUser(data);
		} else if (error) {
			console.log(error);
			setUser(null);
			alert(error.message);
		}

		setOpen(false);
	}

	function handleOpenChange(open: boolean) {
		if (!open && !user) {
			alert("You must set a valid username to proceed.");
			return;
		}

		setOpen(open);
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Choose a Username</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										What should we call you?
									</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Save
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default UsernameDialog;
