import { HttpContext } from './azure.model';
export declare class Context {
    id: string;
    stream: string;
    start: number;
    end: number;
    region: string;
    account: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: string;
    timeout: number;
    alias: string;
    callbackWaitsForEmptyEventLoop: boolean;
    invokedFunctionArn: string;
    awsRequestId: string;
    invokeid: string;
    logGroupName: string;
    logStreamName: string;
    azureContext: HttpContext;
    constructor(functionName: string, azureContext: HttpContext, id?: string, stream?: string);
    getRemainingTimeInMillis: () => number;
    succeed: (result: any) => void;
    fail: (err: any) => void;
    done: (err: any, result?: any) => void;
}
