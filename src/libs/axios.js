import axios from 'axios';
import Vue from 'vue';
import Promise from 'Promise';
import md5 from './md5';
import util from './util';
import GZStorage from './GZStorage';
let axiosProvider = {

};

function getValue(obj) {
    var type = util.typeOf(obj);
    if (type === 'object' || type === 'array') {
        var str = JSON.stringify(obj);
        return str;
    } else
        return obj;
}

axiosProvider._getRemote = function () {
    var v = axios.create({
        baseURL: 'http://localhost:4462/api',
        // baseURL: util.baseURL,
        timeout: 30000
    });
    //处理请求
    v.interceptors.request.use(
        config => {
            var p = [];
            if (!config.params) config.params = {};
            config.params._t = Date.parse(new Date()) / 1000;
            if (config.method == 'post') {
                // if (!config.data) config.data = [];
                // config.data._t = Date.parse(new Date()) / 1000;
                for (var key1 in config.data) {
                    p.push({
                        key: key1,
                        value: config.data[key1]
                    });
                }
            }
            for (var key2 in config.params) {
                p.push({
                    key: key2,
                    value: config.params[key2]
                });
            }

            //参数排序
            p.sort((a, b) => {
                return a.key.toLowerCase() > b.key.toLowerCase() ? 1 : -1;
            });

            //拼接字符串
            var str = '';
            p.forEach(e => {
                if (e.value != null)
                    str += ('&' + e.key + '=' + getValue(e.value));
            });
            if (str.length > 0) str = str.slice(1);
            //计算签名
            var tokenSecret;
            if (GZStorage.getLoginStatus()) {
                config.headers['token'] = GZStorage.getToken();
                tokenSecret = GZStorage.getSecretKey();
                config.headers['rid'] = GZStorage.getSecretID();
            } else {
                tokenSecret = 'GarsonHans';
            }
            // debugger
            var _parmStr = str + tokenSecret;
            var sign = md5.hex_md5(_parmStr);
            // console.log(_parmStr);
            // console.log(sign);
            config.headers['sign'] = sign;
            return config;
        }, error => {
            return Promise.reject(error);
        });

    //处理响应
    v.interceptors.response.use(this.axiosSuccess, this.axiosError);

    return v;
};

axiosProvider.axiosSuccess = function (response) {
    if (response.data.error === 0) {
        response.result = response.data;

        if (response.result && response.result.tokenSecret) { //密钥有更新了
            GZStorage.setSecretKey(response.result.rid, response.result.tokenSecret);
        }
        response.data = response.data.data;
    }
    return response;
};
axiosProvider.axiosError = function (err) {
    var title = '请求异常';
    if (err && err.response) {

        switch (err.response.status) {

            case 400:
                {
                    //{"Message":"请求无效。","ModelState":{"model.componentName":["组件名称不能为空"]}}
                    // debugger
                    var msg = '';
                    switch (err.response.data.error) {
                        case 1:
                        case -1:
                            {
                                msg = '请求失败：<br/>';
                                err.message = err.response.data.message;
                            }
                            break;
                        case -2:
                            {
                                msg = '表单验证失败：<br/>';
                                for (let k in err.response.data.data.ModelState) {
                                    msg += ('<br/>' + err.response.data.data.ModelState[k]);
                                }
                                err.message = msg;
                            }
                            break;
                        case -3:
                            {
                                msg = '表单保存失败：<br/>';

                                err.message = msg + err.response.data.message;
                            }
                            break;
                        case 2:
                            {
                                msg = '请求发生异常：<br/>';
                                err.message = msg + err.response.data.message;
                            }
                            break;
                        case 3:
                            {
                                msg = '签名错误：<br/>请联系管理员';
                                err.message = msg;
                            }
                            break;
                        case 4:
                            {
                                title = '登录失败';
                                err.message = '账号或密码错误';
                            }
                            break;
                        case 5:
                            {
                                title = '未知来源';
                                err.message = '客户端未知';
                            }
                            break;
                        case 6:
                            {
                                title = '请求失败';
                                err.message = '权限不足';
                            }
                            break;
                        case 7:
                        case 8:
                            {
                                // debugger
                                localStorage.setItem('isLogin', false);
                                // Vue.$router.push({ name: 'login' });
                                window.location.href = "/login";
                            }
                            break;
                        default:
                            {
                                msg = '请求失败：' + err.response.data.error + '<br/>';
                                err.message = msg + err.response.data.message;
                            }
                            break;
                    }
                }
                break;
            case 401:
                err.message = '未授权，请求失败';
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
        title: title,
        content: err.message,
        okText: '确定'
    });
    return Promise.reject(err); // eslint-disable-line no-undef
};

export default axiosProvider;