import { transformResponse, getJsonData } from '../helper/response';
import { httpError, StatusError } from './error';

export default class HttpRequest {
    constructor(params) {
        return new Promise((resolve, reject) => {
            let xmlHttp = new XMLHttpRequest();
            // xmlHttp.onload === undefined ? (xmlHttp.xhr_ie8 = true): (xmlHttp.xhr_ie8 = false);
            xmlHttp.timeout = params.timeout;
            xmlHttp.open(params.method, params.url, params.async);
            Object.keys(params.headers).forEach((key) => {
                if (params.headers[key]) {
                    xmlHttp.setRequestHeader(key, params.headers[key]);
                }
            });
            if (params.withCredentials) {
                xmlHttp.withCredentials = true;
            }
            if (params.responseType == 'blob') {
                xmlHttp.responsetype = 'blob'
            }
            xmlHttp.send(params.data);

            httpError(xmlHttp, reject, params.isShowSystemError, params.errTipTime);

            xmlHttp.onreadystatechange = () => {
                let isShowError = params.isShowError || params.isShowSystemError;
                if (+xmlHttp.readyState === 4) {
                    if (+xmlHttp.status >= 200 && +xmlHttp.status < 300) {
                        
                        if (params.responseType === 'html') {
                            resolve(xmlHttp.responseText);
                            return;
                        }
                        if ( params.responseType === 'blob') {
                            var reader = new FileReader();
                            reader.readAsDataURL(xmlHttp.responseText)
                            reader.onload = function (e) {
                                resolve(e.target.result)
                            }
                        }
                        if (+xmlHttp.status === 204) {
                            resolve({
                                success: true
                            });
                        }
                        let json = getJsonData(xmlHttp.responseText);
                        json = transformResponse(json, isShowError, params.errTipTime);
                        json.success ? resolve(json.json) : reject(json.json);
                    } else {
                        StatusError(xmlHttp, reject, isShowError, params.errTipTime);
                    }
                }
            };
        });
    }

}