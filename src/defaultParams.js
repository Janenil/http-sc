export default {
    // 接口请求地址
    url: '',
    // 接口请求方式
    method: 'get',
    // fetch 请求模式
    mode: 'cors',
    // fetch 是否发送cookie
    credentials: 'same-origin',
    // fetch 缓存
    cache: 'no-cache',
    // fetch 重定向
    redirect: 'follow',
    // fetch 请求参数
    body: {},
    // 统一追加前缀
    baseUrl: '',
    // 请求接口中公共数据
    pulbicParams:{},
    // 接口传输数据
    data: {},
    // // 请求前参数处理
    // transformRequest: [],
    // // 请求后参数处理
    // transformResponse: [],
    // 接口请求中设置的http的header数据
    headers: {
    },
    // 请求接口中公共数据
    publicData: {},
    // 接口请求超时时间
    timeout: 20000,
    // 跨域接口请求中是否发送跨域凭证
    withCredentials: false, // default
    // 希望获得接口响应数据类型
    responseType: 'json', // default
    // 是否异步请求
    async: true,
    // 接口请求中可以发送的数据类型
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    // contentType: 'application/json; charset=UTF-8',
    // 接口传输数据的补充
    params: {},
    // 是否传值为json
    isJson: false,
    // 是否展示错误
    isShowError: true,
    // 是否展示所有错误
    isShowSystemError: true,
    // 错误提示显示时间
    errTipTime: 2500,
    // serviceDiscover default config
    serviceDiscover: null,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
};