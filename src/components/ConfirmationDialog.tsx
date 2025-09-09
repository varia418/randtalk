import { NavLink } from "react-router";
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

function ConfirmationDialog({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
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
					<NavLink to="/">
						<Button variant="destructive">Leave</Button>
					</NavLink>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ConfirmationDialog;
