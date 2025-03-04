export interface ApiError<T = Record<string, unknown>> {
	error: {
		message: string;
		details?: { [P in keyof T]: string };
	};
}
