import { checkStatus, parseJSON } from '../helper/response';
import { transformResponse } from '../helper/response';
import { errFetch } from './error';
export default class Fetch {
    constructor(params) {
        return new Promise((resolve, reject) => {
            let abortId;
            let timeout = false;
            if (params.timeout) {
                abortId = setTimeout(() => {
                    timeout = true;
                    reject(new Error('timeout!'));
                }, params.timeout || 6000);
            }
            if(params.withCredentials) {
                params.credentials = 'include'
            }
            // 根据isjson 对传参做处理
            if(params.method != 'get' && params.method != 'head') {
                if (!params.isJson) {
                    let formData = new FormData();
                    Object.keys(params.data).forEach((key) => {
                            formData.append(key, params.data[key]);
                    });
                    params.body = formData;
                } else {
                    params.body = params.data
                }
            }
            
            let headers = new Headers()
            Object.keys(params.headers).forEach((key) => {
                // 如果是formdata 无需设置contentType
                if (!params.isJson) {
                    if (params.headers[key] && key != 'Content-Type') {
                        headers.append(`${key}`, params.headers[key]);
                    }
                } else {
                    headers.append(`${key}`, params.headers[key]);
                }
            });
            params.headers = headers;

            if (params.responseType == 'blob') {
                fetch(params.url, params)
                .then(res => {
                    if (timeout) throw new Error('timeout!');
                    return res.blob()
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob)
                    let dom = document.createElement('a')
                    dom.href = url
                    document.body.appendChild(dom);
                    dom.click();
                    dom.remove();
                    resolve({
                        success: true,
                        json: {data: url}
                    });
                })
                .catch(err =>{
                    errFetch(err, reject)
                })
            }

            let {method, body, cache,credentials,mode,redirect,referrer} = Object.assign(params,{method: params.method});
            fetch(params.url, {
                method, 
                body,
                cache,
                credentials,
                headers,
                mode,
                redirect,
                referrer
            })
            // fetch(params.url, obj)
            .then(res => {
                if (timeout) throw new Error('timeout!');
                return checkStatus(res, reject);
            })
            .then(res => {
                return parseJSON(res)
            })
            .then(data => {
                let json = transformResponse(data, params.isShowError || params.isShowSystemError, params.errTipTime)
                json.success ? resolve(json.json) : reject(json.json);
            })
            .catch(err =>{
                errFetch(err, reject);
            }) 
        });
    }
}