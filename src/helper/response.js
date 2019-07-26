import Toast from '@souche-ui/assassin-toast';

export function getJsonData(json = '{}', defaultValue = {}) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return defaultValue;
    }
}

/**
 * @param 转换返回数据
 */
export function transformResponse(json, isShowError, duration) {
    if (json.hasOwnProperty('error')) { // eslint-disable-line
        json.success = json.error === 0;
    }
    if (!(json.message === 'OK' || json.success)) {
        let data = {
            info: json.msg || json.message || '系统异常',
            duration
        };
        if (json.traceId) {
            data.traceId = json.traceId;
        }
        if (isShowError) {
            Toast.show(data);
        }
        return {
            success: false,
            json
        };
    }
    return {
        success: true,
        json: json.data
    };
}


export function checkStatus(response, reject) {
    if(response.ok) {
        return response;
    }
    let error = new Error(response.statusText);
    let json = {
        success: false,
        msg: response.statusText || '未知异常',
        err: error.toString(),
        errCN: response.statusText  || '未知异常'
    }
    reject(json);
}

export function parseJSON(response) {
    return response.json();
}
