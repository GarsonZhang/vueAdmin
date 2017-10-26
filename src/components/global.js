import gzButton from './iview//button';
import GzModal from './iview/modal';
import gzMenu from './iview/menu';

import gzPanel from './layout/panel';

const gziview = {
    gzButton, GzModal,gzMenu,gzPanel
};

const install = function (Vue) {
    Object.keys(gziview).forEach((key) => {
        Vue.component(key, gziview[key]);
    });
};

export default Object.assign(gziview,{install});