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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const username = values.username.trim();
		sessionStorage.setItem("username", username);
		setOpen(false);
	}

	function handleOpenChange(open: boolean) {
		console.log(open);
		if (!open) {
			const username = sessionStorage.getItem("username");
			try {
				formSchema.parse({ username });
			} catch {
				console.log("here");
				alert("You must set a valid username to proceed.");
				return;
			}
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
						<Button
							type="submit"
							className="w-full bg-blue-500 hover:bg-blue-600 text-white"
						>
							Save
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default UsernameDialog;
