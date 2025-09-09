export interface Room {
	id: string;
	title: string;
	creator: string;
	numberOfParticipants: number;
	createdAt: Date;
}

export interface User {
    id: number;
    name: string;
}