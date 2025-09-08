import Header from "../components/Header";

function Home() {
	return (
		<div className="min-h-screen container mx-auto">
			<Header />
			<h1 className="text-6xl font-bold text-center text-blue-500 mt-20 mb-6">
				Say Hi to Someone New
			</h1>
			<p className="text-center text-xl">
				No Sign-Up. Just Start Talking.
			</p>
		</div>
	);
}

export default Home;
