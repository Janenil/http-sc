import { merge } from './utils';
import Fetch from 'http-souche/src/clientRequest/fetch';

// 校验是否包含file参数
function checkHasFile(data) {
    for (var i in data) {
        if(toString.call(data[i]) === '[object File]'){
            return true;
        }
    }
    return false;
}

// 过滤参数
function filterParams(data) {
    for (let key in data) {
        // 判断是定义在对象本身而不是继承自原型链
        if ({}.hasOwnProperty.call(data, key)) {
            let undefinedData = data[key] === undefined;
            // 判断是否为undefined或者$
            if (/^\$/.test(key) || undefinedData) {
                if (undefinedData && process.env.NODE_ENV !== 'production') {
                    console.warn('Net Work Error: ' + key + ' 不允许为undefined'); // eslint-disable-line
                }
                delete data[key];
            }
        }
    }
    return data;
}

function getStringParams(data) {
    let arr = [];
    for (let key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
            let item = data[key];
            arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
        }
    }
    return arr.join('&');
}

export function getRequestUrl(url, paramsObj) {

    let dataStr = getStringParams(paramsObj);

    if (dataStr) {
        let sign = url.indexOf('?') > -1 ? '&' : '?';
        url += `${sign}${dataStr}`;
    }

    return url;
}

// 整理出最后的参数
function arrangeParams(params, urlParamsType, hasFile, isFetch) {
    // 有文件请求
    if (hasFile) {
        let arr = new FormData();
        for (let key in params.data) {
            if ({}.hasOwnProperty.call(params.data, key)) {
                let item = params.data[key];
                if (item instanceof File) {
                    arr.append(encodeURIComponent(key), item);
                } else {
                    arr.append(encodeURIComponent(key), encodeURIComponent(item));
                }
            }
        }
        params.data = arr;
        return params;
    }
    
    if (!!isFetch && !params.isJson) {
        return params;
    }
    
    // 参数正常放在body中的逻辑
    if (params.contentType.indexOf('application/json') > -1 || !!params.isJson) {
        params.headers['Content-Type'] = 'application/json; charset=UTF-8';
        params.data = typeof params.data === 'string' ? params.data : JSON.stringify(params.data);
        return params;
    }

    // 参数放在url中的逻辑
    if (urlParamsType) {
        params.url = getRequestUrl(params.url, params.data);
        params.data = null;
        return params;
    }

    params.data = getStringParams(params.data);
    return params;
    
}

/**
 * @desc 把所有的参数整理好，返回回去
 * @param 真实的网络请求数据
 */
export function reverseParams(params) {
    params.url = params.baseUrl + params.url;
    params.method = params.method.toLowerCase();
    // 是否是post get    true => 不是put post
    let urlParamsType = ['delete', 'get', 'head', 'options'].indexOf(params.method) > -1;
    let hasFile = urlParamsType ? false : checkHasFile(params.data);
    // 处理params参数
    if (urlParamsType) {
        params.data = merge(params.params, params.data);
    } else {
        params.url = getRequestUrl(params.url, params.params);
    }
  
    if (!hasFile) {
        if (!params.headers || !params.headers['Content-Type']) {
            params.headers['Content-Type'] = params.contentType;
        }
    }

    params.data = filterParams(params.data);

    params = arrangeParams(params, urlParamsType, hasFile);
    return params;
}

/**
 * @desc fetch-把所有的参数整理好，返回回去
 * @param 真实的网络请求数据
 */
export function fetchReverseParams(params) {
    params.url = params.baseUrl + params.url;
    params.method = params.method.toUpperCase();
    //post.put.patch
    let urlParamsType = ['DELETE', 'GET', 'HEAD', 'OPTIONS'].indexOf(params.method) > -1;
    let hasFile = urlParamsType ? false : checkHasFile(params.data);
    
    if (!hasFile) {
        params.data = merge(params.params, params.data);
        if (!params.headers || !params.headers['Content-Type']) {
            params.headers['Content-Type'] = params.contentType;
        }
    }

    params.data = filterParams(params.data);
    params = arrangeParams(params, urlParamsType, hasFile, true);
    return params;
}
