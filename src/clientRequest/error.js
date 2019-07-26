import { merge } from '../helper/utils';
import { transformResponse, getJsonData } from '../helper/response';

const errConfig = [{
    method: 'onabort',
    err: 'Request aborted',
    errCN: '请求中断',
    code: '430'
}, {
    method: 'onerror',
    err: 'Network Error',
    errCN: '网络异常',
    code: '400'
}, {
    method: 'ontimeout',
    err: 'Timeout',
    errCN: '请求超时',
    code: '503'
}];

export function httpError(xmlHttp, reject, isShowError, errTipTime) {
    errConfig.forEach(function(config) {
        xmlHttp[config.method] = function() {
            if (!xmlHttp) {
                return;
            }
            xmlHttp = null;
            let { json } = transformResponse(merge({
                success: false,
                msg: config.errCN
            }, config), isShowError, errTipTime);
            delete json.method;
            reject(json);
        };
    });
}

export function StatusError(xmlHttp, reject, isShowError, errTipTime) {
    setTimeout(() => {
        if (!xmlHttp) {
            return;
        }
        let statusText = xmlHttp.responseText;
        statusText = getJsonData(statusText, null);
        let json = {
            success: false,
            code: `${xmlHttp.status}`,
            msg: '未知异常',
            err: 'Unknown Exception',
            errCN: '未知异常'
        };
        if (statusText && typeof statusText === 'object') {
            json = transformResponse(merge(json, {
                data: statusText,
                msg: statusText.msg,
                err: statusText.msg
            }), isShowError, errTipTime);
            reject(json.json);
        } else {
            transformResponse(json, isShowError, errTipTime);
            reject(json);
        }
    }, 0);
}

export function errFetch(err, reject) {
    let json = {
        success: false,
        msg: '未知异常',
        err: err.toString(),
        errCN: '未知异常'
    }
    if (typeof err.text === 'function') {
        err.text().then(errorMessage => {
            json[err] = errorMessage.toString()
        });
    }
    reject(json);
}