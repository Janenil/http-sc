# 网络请求库

## 目标
使用Fetch和XMLHttpRequest暴露统一api来封装网络异步请求，统一处理错误，方便自己部门维护。

## 功能图

![image](http://img.souche.com/f2e/42a3f1a8bdefdd8af971229cac1d8bbd.jpeg)


## 时序图
![image]( http://img.souche.com/f2e/3b6add3fe4e6d4dd3cc33e172f56bf31.jpeg)



## 使用

`GET` 请求

```js
import Http from 'http-souche';
let http = new Http()
http.get('/user?ID=11111')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  

http.get('/user', {
      ID: 1111
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })


// 异步请求
async function getUser() {
  try {
    const response = await http.get('/user?ID=11111');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

`POST` 请求


```js
import Http from 'http-souche';
let http = new Http();
http.post('/user', {
      ID: 1111
  },{
    isJson: false
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Http API

<!--Requests can be made by passing the relevant config to `Http`.-->

##### Http(config)

```js
// 发送post请求
import Http from 'http-souche';
let http = new Http();
http({
  method: 'post',
  url: '/user/11111',
  data: {
    ID: 1111
  }
});
```

### 请求方法别名

##### Http.request(config)
##### Http.get(url[, data[, config]])
##### Http.delete(url[, data[, config]])
##### Http.head(url[, data[, config]])
##### Http.post(url[, data[, config]])
##### Http.put(url[, data[, config]])
##### Http.patch(url[, data[, config]])
##### Http.obtainBlob(url[, data[, config]])

### 创建实例

可以使用自定义配置创建新的HTTP实例。

##### http.create([config])

```js
const instance = http.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});
```

## 请求配置

fetchAPI与xhr参数配置略有不同，统一写在同个配置文件中
url为必填项，方式默认为'get'

```js
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
```

## response格式

请求成功返回数据，请求失败toast报错信息





