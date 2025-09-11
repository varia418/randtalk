import { File, X } from "lucide-react";
import { Button } from "./ui/button";

interface FilePreviewProps {
	file: File | string;
	onClear?: () => void;
}

function FilePreview({ file, onClear }: FilePreviewProps) {
	const fileName = typeof file === "string" ? file.split("/").pop() : file.name;

	return (
		<div className="relative flex items-center gap-2 p-2 border rounded-lg">
			<File className="w-6 h-6" />
			<span className="truncate">{fileName}</span>
			{onClear && (
				<Button
					size="icon"
					variant="destructive"
					className="absolute top-1 right-1 w-6 h-6"
					onClick={onClear}
				>
					<X className="w-4 h-4" />
				</Button>
			)}
		</div>
	);
}

export default FilePreview;
