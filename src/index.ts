import { HttpContext } from './azure.model';
import * as uuid from 'uuid';
import * as moment from 'moment';

export = AwsContext;

class AwsContext {
    // base
    id: string;
    stream: string;
    start: number;
    end: number;

    // options
    region: string;
    account: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: string;
    timeout: number;
    alias: string;

    // context
    callbackWaitsForEmptyEventLoop: boolean;
    invokedFunctionArn: string;
    awsRequestId: string;
    invokeid: string;
    logGroupName: string;
    logStreamName: string;

    // azure context
    azureContext: HttpContext;

    constructor(functionName: string, azureContext: HttpContext, id?: string, stream?: string) {
        this.id = id || uuid.v1();
        this.stream = stream || uuid.v4().replace(/-/g, '');
        this.start = Date.now();

        this.azureContext = azureContext;

        this.region = 'us-west-1';
		this.account = '123456789012';
		this.functionName = functionName;
		this.functionVersion = '$LATEST';
		this.memoryLimitInMB = '128';
        this.timeout = 3;
        
        this.callbackWaitsForEmptyEventLoop = true;
        this.invokedFunctionArn = `arn:aws:lambda:${this.region}:${this.account}:function:${this.functionName}:${this.alias || this.functionVersion}`;
        this.awsRequestId = this.id;
        this.invokeid = this.id;
        this.logGroupName = `/aws/lambda/${this.functionName}`;
        this.logStreamName = `${moment().format('YYYY/MM/DD')}/[${this.functionVersion}]/${this.stream}`;
    }

    getRemainingTimeInMillis = () => {
        const endTime = this.end || Date.now();
        const remainingTime = (this.timeout * 1000) - (endTime - this.start);

        return Math.max(0, remainingTime);
    }

    succeed = (result: any) => {
        this.end = Date.now();
        this.azureContext.log(`Success result: ${JSON.stringify(result)}`); // logging

        this.azureContext.res = {
            status: 200,
            body: result
        }
        this.azureContext.done(null);
        return;
    }

    fail = (err: any) => {
        this.end = Date.now();
        this.azureContext.log(`Error logged: ${JSON.stringify(err)}`); // logging

        if (typeof err === 'string') {
            err = new Error(err);
        }

        this.azureContext.done(err);
        return;
    }

    done = (err: any, result?: any) => {
        if (err) {
            this.fail(err);
            return;
        }

        this.succeed(result);
        return;
    }
}
