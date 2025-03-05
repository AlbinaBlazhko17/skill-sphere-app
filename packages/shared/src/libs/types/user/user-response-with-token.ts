import { IUserResponse } from '@skill-sphere/shared';

export interface IUserResponseWithToken extends IUserResponse {
	token: string;
}
