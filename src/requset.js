const URL = require('url');
const qs = require('querystring');
const ServerRequest = requier('./serverRequest');
const defaultParams =  require('http-souche/src/defaultParams');

function Request(defaultConfig, cookie) {
	this.cookies = [];
	if (cookie !== undefined) {
		this.setCookie(cookie);
	}
}

Request.prototype.getHeaders = function(host, postData) {
	let header = {
		'Host': host,
		'Pragma': 'no-cache',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,es;q=0.2',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
	};
	let headers = Object.assign({}, header, defaultParams)
    params = deepMerge(defaultParams, globalPrams, this.params, params);
     
	if (this.cookies.length) {
		headers.Cookie = this.cookies.join('; ');
	}
	if (postData != '') {
		headers['Content-Length'] = Buffer.byteLength(postData);
	}
	return headers;
}

Request.prototype.setCookie = function(cookie) {
	let cookies = cookie.split(';');
	for (let c of cookies) {
		c = c.replace(/^\s/, '');
		this.cookies.push(c);
	}
	return this;
}

Request.prototype.request = function(method, url, params) {
	let postData = qs.stringify(params || {});
	let urlObj = URL.parse(url);
	let protocol = urlObj.protocol;
	let options = {
		hostname: protocol + urlObj.host,
		port: urlObj.port,
		path: urlObj.path,
		method: method,
		headers: this.getHeaders(urlObj.host, postData),
	};
    let request = new ServerRequest(options);

    return request;

}

// Request.prototype.get = function(url) {
// 	return this.request('GET', url, null);
// }

// Request.prototype.post = function(url, params) {
// 	return this.request('POST', url, params);
// }

["get", "post", "put", "patch", "head", "delete"].forEach(function(method) {
    Request.prototype[method] = function(url, data = {}, config = {}) {
        return this.request(merge(config, {
            method,
            url,
            data
        }));
    };
});


module.exports = function(cookie) {
	return new Request(cookie);
}