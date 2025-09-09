import { Spinner } from "./ui/shadcn-io/spinner";

function GlobalSpinner() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<Spinner className="h-16 w-16" variant="circle" />
		</div>
	);
}

export default GlobalSpinner;
