import Ajax from './clientRequest/xhrRequset';
import Fetch from './clientRequest/fetch';
import { merge, deepMerge, deepClone } from './helper/utils';
import { reverseParams,fetchReverseParams } from './helper/reverseData';
import defaultParams from 'http-souche/src/defaultParams';


function Instance(params) {
    this.params = params || {};
}


Instance.prototype = {
    request(params) {
        let request;
        if (!window.fetch && typeof window.fetch !== 'function') {
            params = deepMerge(defaultParams, this.params, params);
            params = fetchReverseParams(params);
            request = new Fetch(params);
        } else {
            params = deepMerge(defaultParams, this.params, params);
            params = reverseParams(params);
            request = new Ajax(params);
        }
        return request;
    }
};

["get", "post", "put", "patch", "head", "delete"].forEach(function(method) {
    Instance.prototype[method] = function(url, data = {}, config = {}) {
        return this.request(merge(config, {
            method,
            url,
            data
        }));
    };
});

// 二进制
Instance.prototype.obtainBlob = function (method, url, data={}, config = {}) {
    return this.request(merge(config, {
        method,
        url,
        data,
        responseType: 'blob'
    }));
};


export default Instance;