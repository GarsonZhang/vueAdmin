import Env from './env';

let config = {
    env: Env,
    root: Env === 'production' ? '/pc' : '',
    baseURL: Env === 'production' ? '/server/api' :'http://localhost:9200/server/api',
    baseURLReport: Env === 'production' ?'/server/report' :'http://localhost:9200/server/report',
};
export default config;