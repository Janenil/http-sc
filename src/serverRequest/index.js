import { transformResponse, getJsonData } from '../helper/response';
const zlib = require('zlib');
const http = require('http');
const https = require('https');
const request = require('request');
import { merge, deepMerge } from './helper/utils';
const querystring = require('querystring');
export default class HttpRequest {
    constructor(params) {
        return new Promise((resolve, reject) => {
            let req = (params.hostname.indexOf('http:') > -1 ? http : https).request(options, (res) => {
                let chunks = [];
                res.on('data', (data) => {
                    chunks.push(data);
                });
                res.on('end', () => {
                    let buffer = Buffer.concat(chunks);
                    let encoding = res.headers['content-encoding'];
                    if (encoding == 'gzip') {
                        zlib.gunzip(buffer, function(err, decoded) {
                            resolve(decoded.toString());
                        });
                    } else if (encoding == 'deflate') {
                        zlib.inflate(buffer, function(err, decoded) {
                            resolve(decoded.toString());
                        });
                    } else {
                        resolve(buffer.toString());
                    }
                });
            });
            req.on('error', (e) => {
                reject(e);
            });
            if (postData != '') {
                req.write(postData);
            }
            req.end();
        })
    }
}


