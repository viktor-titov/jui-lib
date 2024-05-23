export type ApiError = string | {
    message: string;
    httpStatus?: any;
    httpStatusText?: string;
    httpUrl?: string;
    httpQuery?: string;
    httpBody?: string;
};
