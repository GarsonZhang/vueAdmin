// import Promise from 'Promise';
import axiosProvider from './axios';

const _ajaxRemote = axiosProvider._getRemote();

const ajax = {
    get(pageContext, url, data) {

        var id = pageContext.$route.meta.id;

        var config = {
            headers: {
                'fid': id,
                'client': 'pc'
            },
            params: data
        };
        return _ajaxRemote.get(url, config);
    },
    post(pageContext, url, data) {
        var id = pageContext.$route.meta.id;
        var config = {
            headers: {
                'fid': id,
                'client': 'pc'
            }
        };
        return _ajaxRemote.post(url, data,config);
    }
};

//模块请求类
const requestModule = {
    list(context) {
        return ajax.get(context, '/module/list');
    },
    get(context, rowID) {
        return ajax.get(context, '/module/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/module/create', data);
    },
    update(context, data) {
        return ajax.post(context, '/module/update', data);
    },
    updateBatch(context, datas) {
        return ajax.post(context, '/module/updatebatch', datas);
    },
    delete(context, rowID) {
        return ajax.get(context, '/module/delete', {
            rowID
        });
    }
};
//模块功能请求类
const requestForm = {
    list(context, moduleID) {
        return ajax.get(context, '/moduleform/list', {
            moduleID
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/moduleform/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/module/create', data);
    },
    update(context, data) {
        return ajax.post(context, '/module/update', data);
    },
    updateBatch(context, datas) {
        return ajax.post(context, '/module/updatebatch', datas);
    },
    delete(context, rowID) {
        return ajax.get(context, '/moduleform/get', {
            rowID
        });
    }
};

const system = {
    getMenu(context) {
        return ajax.get(context, '/menu/all');
    },
};

const ReqCommonDataCompany = {
    list(context) {
        return ajax.get(context, '/company/list');
    },
    treeData(context) {
        return ajax.get(context, '/company/treedata');
    },
    search(context, code) {
        return ajax.get(context, '/company/search', {
            code: code
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/company/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/company/create', data);
    },
    delete(context, rowid) {
        return ajax.get(context, '/company/delete', {
            rowID: rowid
        });
    },
    update(context, data) {
        return ajax.post(context, '/company/update', data);
    }
};

const requestCommonDataDept = {
    list(context, companyID) {
        return ajax.get(context, '/dept/list', {
            companyID
        });
    },
    treeData(context) {
        return ajax.get(context, '/dept/treedata');
    },
    search(context, companyID, code) {
        return ajax.get(context, '/dept/search', {
            companyID,
            code: code
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/dept/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/dept/create', data);
    },
    delete(context, rowID) {
        return ajax.get(context, '/dept/delete', {
            rowID
        });
    },
    update(context, data) {
        return ajax.post(context, '/dept/update', data);
    }
};

const requestUser = {
    list(context, pageIndex, pageSize) {
        return ajax.get(context, '/user/list', {
            pageSize,
            pageIndex
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/user/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/user/create', data);

    },
    delete(context, rowID) {
        return ajax.get(context, '/user/delete', {
            rowID
        });
    },
    update(context, data) {
        // debugger
        return ajax.post(context, '/user/update', data);
    },
    login(context, account, pwd) {
        return ajax.get(context, '/user/login', {
            account: account,
            pwd: pwd
        });
    }
};

const requestAPIList = {
    list(context, pageIndex, pageSize) {
        return ajax.get(context, '/apilist/list', {
            pageIndex,
            pageSize
        });
    },
    import (context) {
        return ajax.get(context, '/apilist/import');
    },
    get(context, rowID) {
        return ajax.get(context, '/apilist/get', {
            rowID
        });
    },
    update(context, data) {
        return ajax.post(context, '/apilist/update', data);
    },
    delete(context, rowID) {
        return ajax.get(context, '/apilist/delete', {
            rowID
        });
    }
};

export {
    requestModule,
    requestForm,
    system,
    ReqCommonDataCompany,
    requestCommonDataDept,
    requestUser,
    requestAPIList
};