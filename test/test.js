'use strict';

var expect = require('chai').expect;
var AwsContext = require('../dist/index').Context;

describe('get a context', () => {
    it('should give a context', () => {
        let httpContext = { log: console.log, req: {}, res: {} };
        let context = new AwsContext('my function', httpContext);

        expect(context).to.contain.keys(['id', 'region', 'azureContext']);
    })
})