declare namespace Express {
    export interface Request {
        context: {
            id: number | string;
        };
    }
}
