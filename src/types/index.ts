export interface Room {
	id: string;
	title: string;
	creator: string;
	numberOfParticipants: number;
	createdAt: Date;
}

export interface User {
	id: string;
	displayName: string;
	roomId?: string;
}

export interface Message {
	id: string;
	content: string;
	sender: string;
	roomId: string;
	createdAt: Date;
}
