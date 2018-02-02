import Env from './env';

let config = {
    env: Env,
    root: Env === 'production' ? '/pc' : '',
    // baseURL: Env === 'production' ? 'http://osap.hans-china.com/server/api' :'http://localhost:9200/server/api',
    // baseURLReport: Env === 'production' ?'http://osap.hans-china.com/server/report' :'http://localhost:9200/server/report',
    baseURL: 'http://osap.hans-china.com/server/api',
    baseURLReport: 'http://osap.hans-china.com/server/report'
};
export default config;