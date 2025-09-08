import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function ToolBar() {
	const [sorting, setSorting] = useState("most-recent");

	return (
		<div className="flex mt-10 gap-4">
			<Button>
				<Plus />
				Create a Room
			</Button>
			<div className="flex gap-4 ml-auto">
				<Select value={sorting} onValueChange={setSorting}>
					<SelectTrigger className="w-[140px]">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="most-recent">Most recent</SelectItem>
						<SelectItem value="most-popular">
							Most popular
						</SelectItem>
					</SelectContent>
				</Select>
				{/* <div className="flex w-full max-w-sm items-center space-x-2">
						<Input
							type="search"
							placeholder="Search by title or id"
							className="flex-1"
						/>
						<Button
							type="submit"
							size="icon"
						>
							<Search className="h-4 w-4" />
						</Button>
					</div> */}
			</div>
		</div>
	);
}

export default ToolBar;
