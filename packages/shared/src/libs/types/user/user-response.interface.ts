export interface IUserResponse {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	imageUrl: string | null;
	createdAt: Date;
	updatedAt: Date;
}
