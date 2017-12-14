exports.getLocation = function(zipCode="15213", callback){
    return(function(callback) {
    'use strict';
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const apiKey = "C2y0Y7rol4iuq2bIET4MXtP9HM3XpJa8Jzmhz7UOg4GU8xl5W7e2Qnc2JXMCqIt9"
    const httpOptions = {
        hostname: 'www.zipcodeapi.com',
        port: '443',
        path: `/rest/${apiKey}/info.json/${zipCode}/degrees`,
        method: 'GET'
    };
    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ?
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;

            callback(null, res.statusCode, res.headers, responseStr);
        });
    })
    .setTimeout(120000)
    .on('error', (error) => {
        callback(error);
    });
    request.write("");
    request.end();
})(callback);
};
