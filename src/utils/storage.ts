import supabase from "./supabase";
import { BUCKET_NAME } from "@/constants";

const getFileHash = async (file: File): Promise<string> => {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
};

export const uploadFile = async (file: File) => {
	const fileHash = await getFileHash(file);
	const fileExtension = file.name.split(".").pop();
	const fileName = `${fileHash}${fileExtension ? `.${fileExtension}` : ""}`;

	const { data: existingFiles } = await supabase.storage
		.from(BUCKET_NAME)
		.list("", {
			search: fileName,
			limit: 1,
		});

	if (existingFiles && existingFiles.length > 0) {
		return { path: fileName };
	}

	const { data, error } = await supabase.storage
		.from(BUCKET_NAME)
		.upload(fileName, file);

	if (error) {
		throw error;
	}

	return data;
};

export const getFileUrl = (path: string) => {
	const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);

	return data.publicUrl;
};