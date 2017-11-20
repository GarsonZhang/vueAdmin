import axios from 'axios';
import Vue from 'vue';

let axiosProvider = {

};

axiosProvider._getRemote = function () {
    var v = axios.create({
        baseURL: 'http://localhost:4462/api',
        timeout: 10000
    });
    //处理请求
    /* 
    v.interceptors.request.use(  
        config => {  
            var xtoken = getXtoken()  
            if(xtoken != null){  
                config.headers['X-Token'] = xtoken  
            }  
            if(config.method=='post'){  
                config.data = {  
                    ...config.data,  
                    _t: Date.parse(new Date())/1000,  
                }  
            }else if(config.method=='get'){  
                config.params = {  
                    _t: Date.parse(new Date())/1000,  
                    ...config.params  
                }  
            }  
            return config  
        },function(error){  
            return Promise.reject(error)  
        });  
    */
    //处理响应
    v.interceptors.response.use(this.axiosSuccess, this.axiosError);

    return v;
};

axiosProvider.axiosSuccess = function (response) {
    return response;
};
axiosProvider.axiosError = function (err) {
    if (err && err.response) {

        switch (err.response.status) {
            case 400: {
                //{"Message":"请求无效。","ModelState":{"model.componentName":["组件名称不能为空"]}}
                var msg = '';
                switch (err.response.data.error) {
                    case 1:
                    case -1: {
                        msg = '请求失败：<br/>';
                        err.message = err.response.data.message;
                    } break;
                    case -2: {
                        msg = '表单验证失败：<br/>';
                        for (let k in err.response.data.data.ModelState) {
                            msg += ('<br/>' + err.response.data.ModelState[k]);
                        }
                        err.message = msg;
                    } break;
                    case 2: {
                        msg = '请求发生异常：<br/>';
                        err.message = err.response.data.message;
                    } break;
                }
            } break;
            case 401:
                err.message = '未授权，请登录';
                break;

            case 403:
                err.message = '拒绝访问';
                break;

            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`;
                break;

            case 408:
                err.message = '请求超时';
                break;

            case 500:
                err.message = '服务器内部错误';
                break;

            case 501:
                err.message = '服务未实现';
                break;

            case 502:
                err.message = '网关错误';
                break;

            case 503:
                err.message = '服务不可用';
                break;

            case 504:
                err.message = '网关超时';
                break;

            case 505:
                err.message = 'HTTP版本不受支持';
                break;

            default:
        }
    } else {
        err.message = '网络不可用';
    }
    Vue.prototype.$Modal.error({
        title: '请求异常',
        content: err.message,
        okText: '确定'
    });
    return Promise.reject(err); // eslint-disable-line no-undef
};

export default axiosProvider;