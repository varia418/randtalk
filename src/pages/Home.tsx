import { Button } from "@/components/ui/button";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Plus } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function Home() {
	const [sorting, setSorting] = useState("most-recent");
	return (
		<div className="min-h-screen container mx-auto flex flex-col">
			<Header />
			<h1 className="text-6xl font-bold text-center text-blue-500 mt-20 mb-6">
				Say Hi to Someone New
			</h1>
			<p className="text-center text-xl">
				No Sign-Up. Just Start Talking.
			</p>
			<div className="flex mt-10 gap-4">
				<Button className="bg-blue-500 hover:bg-blue-600 text-white">
					<Plus />
					Create a Room
				</Button>
				<div className="flex gap-4 ml-auto">
					<Select value={sorting} onValueChange={setSorting}>
						<SelectTrigger className="w-[140px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="most-recent">
								Most recent
							</SelectItem>
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
							className="bg-blue-500 hover:bg-blue-600"
						>
							<Search className="h-4 w-4" />
						</Button>
					</div> */}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Home;
