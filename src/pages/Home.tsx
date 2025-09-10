import ToolBar from "@/components/ToolBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RoomList from "@/components/RoomList";
import UsernameDialog from "@/components/UsernameDialog";
import { useContext, useState } from "react";
import CreateRoomDialog from "@/components/CreateRoomDialog";
import { useLoaderData, useNavigation } from "react-router";
import GlobalSpinner from "@/components/GlobalSpinner";
import UserContext from "@/contexts/UserContext";
import type { RoomWithParticipantsCount } from "@/types";

interface LoaderData {
	rooms: RoomWithParticipantsCount[];
}

function Home() {
	const { user } = useContext(UserContext);
	const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(!user);
	const [createRoomDialogOpen, setCreateRoomDialogOpen] = useState(false);

	const { rooms } = useLoaderData() as LoaderData;

	const navigation = useNavigation();
	const isNavigating = Boolean(navigation.location);

	if (isNavigating) return <GlobalSpinner />;

	return (
		<div className="background-pattern">
			<div className="container mx-auto flex flex-col min-h-screen">
				<Header setIsUsernameDialogOpen={setIsUsernameDialogOpen} />
				<h1 className="text-6xl font-bold text-center text-primary mt-20 mb-6">
					Say Hi to Someone New
				</h1>
				<p className="text-center text-xl">
					No Sign-Up. Just Start Talking.
				</p>
				<ToolBar setCreateRoomDialogOpen={setCreateRoomDialogOpen} />
				<RoomList rooms={rooms} />
				<Footer />
				<UsernameDialog
					open={isUsernameDialogOpen}
					setOpen={setIsUsernameDialogOpen}
				/>
				<CreateRoomDialog
					open={createRoomDialogOpen}
					setOpen={setCreateRoomDialogOpen}
				/>
			</div>
		</div>
	);
}

export default Home;
