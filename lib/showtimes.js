exports.getMovies = function(cinema_id, callback){
    return(function(callback) {
    'use strict';
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.internationalshowtimes.com',
        port: '443',
        path: `/v4/movies/?countries=US&cinema_id=${cinema_id}`,
        method: 'GET',
        headers: {"X-API-Key":'baTHSce7eXenTpUHs5K3wPoNgl1RhG0h'}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
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

exports.getTheatres = function(location, distance=20, callback){
    return(function(callback) {
    'use strict';
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.internationalshowtimes.com',
        port: '443',
        path: `/v4/cinemas?location=${location}&distance=${distance}`,
        method: 'GET',
        headers: {"X-API-Key":'baTHSce7eXenTpUHs5K3wPoNgl1RhG0h'}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
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


exports.getShowtimes = function(cinema_id, movie_id, callback){
    return(function(callback) {
    'use strict';
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'api.internationalshowtimes.com',
        port: '443',
        path: `/v4/showtimes?cinema_id=${cinema_id}&movie_id=${movie_id}`,
        method: 'GET',
        headers: {"X-API-Key":'baTHSce7eXenTpUHs5K3wPoNgl1RhG0h'}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
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
