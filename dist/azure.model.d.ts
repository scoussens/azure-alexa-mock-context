export interface HttpRequest {
    body: any;
    headers: any;
    method: string;
    originalUrl: string;
    query: any;
    params: any;
    rawBody: string;
}
export interface HttpResponse {
    body?: any;
    headers?: any;
    isRaw?: boolean;
    status?: number;
}
export interface HttpContext {
    res: HttpResponse;
    req: HttpRequest;
    done(err: any, callback?: any): void;
    log(message: any): void;
}
export interface TimerContext {
    isPastDue: boolean;
}
export declare const HttpStatusCodes: {
    OK: number;
    NotFound: number;
    Unauthorized: number;
    Error: number;
};
