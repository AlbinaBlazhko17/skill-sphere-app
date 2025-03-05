import { IUserResponseWithToken } from '../user/user-response-with-token.js';

export interface ISignInResponse {
	message: string;
	user: IUserResponseWithToken;
}
