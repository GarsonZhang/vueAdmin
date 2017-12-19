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
    post(pageContext, url, data,param) {
        var id = pageContext.$route.meta.id;
        var config = {
            headers: {
                'fid': id,
                'client': 'pc'
            },
            params:param
        };
        return _ajaxRemote.post(url, data, config);
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
    actions(context, rowID) {
        return ajax.get(context, '/moduleform/actions', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/moduleform/create', data);
    },
    update(context, data) {
        return ajax.post(context, '/moduleform/update', data);
    },
    updateBatch(context, datas) {
        return ajax.post(context, '/moduleform/updatebatch', datas);
    },
    delete(context, rowID) {
        return ajax.get(context, '/moduleform/delete', {
            rowID
        });
    }
};

const requestFormAuthorize = {
    list(context, formID) {
        return ajax.get(context, '/moduleformauthorize/list', {
            formID
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/moduleformauthorize/get', {
            rowID
        });
    },
    delete(context, rowID) {
        // debugger
        return ajax.get(context, '/moduleformauthorize/delete', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/moduleformauthorize/create', data);
    },
    update(context, data) {
        return ajax.post(context, '/moduleformauthorize/update', data);
    }
};

const system = {
    getMenu(context) {
        return ajax.get(context, '/menu/all');
    },
    getMenuTree(context,objectID){
        return ajax.get(context,'/authorize/formTree',{objectID});
    },
    updateAuthorize(context,category,objectID,data){
        // debugger;
        return ajax.post(context,'/authorize/update',{
            category,
            objectID,
            data
        });
    }
};

const ReqCommonDataCompany = {
    list(context) {
        return ajax.get(context, '/company/list');
    },
    cache:[],
    // treeData(context) {
    //     return ajax.get(context, '/company/treedata');
    // },
    search(context, code) {
        //var tag='/company/search'+code;
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

const requestCommonDataPosition = {
    list(context, companyID) {
        return ajax.get(context, '/position/list', {
            companyID
        });
    },
    treeData(context) {
        return ajax.get(context, '/position/treedata');
    },
    search(context, companyID, code) {
        return ajax.get(context, '/position/search', {
            companyID,
            code: code
        });
    },
    get(context, rowID) {
        return ajax.get(context, '/position/get', {
            rowID
        });
    },
    create(context, data) {
        return ajax.post(context, '/position/create', data);
    },
    delete(context, rowID) {
        return ajax.get(context, '/position/delete', {
            rowID
        });
    },
    update(context, data) {
        return ajax.post(context, '/position/update', data);
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
const requestUserRelation={
    list(context,objectID){
        return ajax.get(context, '/userrelation/list',{objectID});
    },
    userList(context,objectID,companyID){
        return ajax.get(context, '/userrelation/listByCompanyID',{objectID,companyID});
    },
    update(context,objectID,category,data){
        return ajax.post(context,'userrelation/update',data,{objectID,category});
    }
};

export {
    requestModule,
    requestForm,
    requestFormAuthorize,
    system,
    ReqCommonDataCompany,
    requestCommonDataDept,
    requestCommonDataPosition,
    requestUser,
    requestAPIList,
    requestUserRelation
};