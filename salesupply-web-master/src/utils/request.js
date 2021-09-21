import { Notification } from 'element-ui';
//1.导入axios
import axios from 'axios';
//2.创建axios实例  instance
const instance = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'foobar'}
});
//3.配置拦截器
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    let {status,message,data} = response.data;
    if (status == 20000){
        return data;
    } else {
        Notification.error(message);
        return Promise.reject(false);
    }
}, function (error) {
    return Promise.reject(error);
});

export default instance;