# Azure-Alexa-Mock-Context

## Purpose

The purpose of this project is to provide a mock AWS context file that can be used in an Azure (or Firebase) function app instead of in an AWS Lambda. This allows you to use other providers of serverless infrustructure and still use the _alexa-sdk_ provided by Amazon.

## Importing

This module was written in typescript, so typings are included.

_import { Context } from 'azure-alexa-mock-context';_

And then in your code you can generate a new context by generating a new class instance:

_let context = new Context('SkillName', ctx);_ where _ctx_ is the Azure context that is passed in from your HttpRequest statement in the function.

## Example

```javascript
export const index = (context: HttpContext, req: HttpRequest) => {
    context.log(JSON.stringify(req, null, 2));
    const awsContext = new Context('CalorieCounter', context);
    let alexa = Alexa.handler(req.body, awsContext);
    let handlers: Alexa.Handlers<{}> = {
        "AboutIntent": function() {
            let output: string = 'This skill was created by Seth Coussens @sethcoussens';
            this.emit(":tellWithCard", output, "GetNewFactIntent", output);
        }
    };
    alexa.registerHandlers(handlers);
    alexa.execute();
}
```
