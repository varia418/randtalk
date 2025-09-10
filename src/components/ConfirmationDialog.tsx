import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog";
import { useContext } from "react";
import UserContext from "@/contexts/UserContext";
import { TABLES } from "@/constants";
import supabase from "@/utils/supabase";

function ConfirmationDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);

	async function leaveRoom() {
		if (user) {
			const { data, error } = await supabase
				.from(TABLES.users)
				.update({ roomId: null })
				.eq("id", user.id)
                .select()
				.single();

			if (error) {
				console.log(error);
			} else {
				setUser(data);
			}
		}

		navigate("/");
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirmation</DialogTitle>
					<DialogDescription>
						Are you sure you want to leave the room?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button variant="destructive" onClick={leaveRoom}>
						Leave
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ConfirmationDialog;
