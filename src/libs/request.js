// import Promise from 'Promise';
import axiosProvider from './axios';

const ajaxRemote = axiosProvider._getRemote();

function paramsForGet(obj) {
    return {
        params: obj
    };
}

function paramsForGet_ID(_id) {
    return paramsForGet({ id: _id });
}

// function doajax(ajax) {
//     new Promise(function (resolve, reject) {
//         ajax.then(res => {
//             resolve(res.data.data);
//         }).catch(err => {
//             reject(err);
//         });
//     });
// }

//模块请求类
const requestModule = {
    list() {
        // return new Promise(function (resolve, reject) {
        //     ajaxRemote.get('/module/list')
        //         .then(res => {
        //             resolve(res);
        //         })
        //         .catch(err => {
        //             reject(err);
        //         });
        // });
        return ajaxRemote.get('/module/list');
    },
    get(_id) {
        var param = { id: _id };
        var config = {
            params: param
        };
        // return new Promise(function (resolve, reject) {
        //     ajaxRemote.get('/module/get', config)
        //         .then(res => {
        //             resolve(res);
        //         })
        //         .catch(err => {
        //             reject(err);
        //         });
        // });
        return ajaxRemote.get('/module/get', config);
    },
    create(data) {
        // return new Promise(function (resolve, reject) {
        //     ajaxRemote.post('/module/create', data)
        //         .then(res => {
        //             resolve(res);
        //         })
        //         .catch(err => {
        //             reject(err);
        //         });
        // });
        return ajaxRemote.post('/module/create', data);
    },
    update(data) {
        // return new Promise(function (resolve, reject) {
        //     ajaxRemote.post('/module/update', data)
        //         .then(res => {
        //             resolve(res);
        //         })
        //         .catch(err => {
        //             reject(err);
        //         });
        // });
        return ajaxRemote.post('/module/update', data);
    },
    updateBatch(datas) {
        return ajaxRemote.post('/module/updatebatch', datas);
    },
    delete(_id) {
        var param = { id: _id };
        var config = {
            params: param
        };
        return ajaxRemote.get('/module/delete', config);
    }
};
//模块功能请求类
const requestForm = {
    list(_id) {
        var config = paramsForGet_ID(_id);
        return ajaxRemote.get('/moduleform/list', config);
    },
    get(_id) {
        var config = paramsForGet_ID(_id);
        return ajaxRemote.get('/moduleform/get', config);
    },
    create(data) {
        return ajaxRemote.post('/moduleform/create', data);
    },
    update(data) {
        return ajaxRemote.post('/moduleform/update', data);
    },
    updateBatch(datas) {
        return ajaxRemote.post('/moduleform/updatebatch', datas);
    },
    delete(_id) {
        var config = paramsForGet_ID(_id);
        return ajaxRemote.get('/moduleform/delete', config);
    }
};

const system = {
    getMenu() {
        return ajaxRemote.get('/menu/all');
    },
};

const ReqCommonDataCompany = {
    list() {
        return ajaxRemote.get('/company/list');
    },
    treeData() {
        return ajaxRemote.get('/company/treedata');
    },
    search(code) {
        return ajaxRemote.get('/company/search', paramsForGet({ code: code }));
    },
    get(_id) {
        var config = paramsForGet_ID(_id);
        return ajaxRemote.get('/company/get', config);
    },
    create(data) {
        return ajaxRemote.post('/company/create', data);
    },
    delete(rowid) {
        return ajaxRemote.get('/company/delete', paramsForGet({ rowID: rowid }));
    },
    update(data) {
        return ajaxRemote.post('/company/update', data);
    }
};

const requestCommonDataDept = {
    list(_companyID) {
        // debugger
        return ajaxRemote.get('/dept/list', paramsForGet({ companyID: _companyID }));
    },
    treeData() {
        return ajaxRemote.get('/dept/treedata');
    },
    search(_companyID, code) {
        return ajaxRemote.get('/dept/search', paramsForGet({ companyID: _companyID, code: code }));
    },
    get(_id) {
        var config = paramsForGet({ rowID: _id });
        return ajaxRemote.get('/dept/get', config);
    },
    create(data) {
        return ajaxRemote.post('/dept/create', data);
    },
    delete(rowid) {
        return ajaxRemote.get('/dept/delete', paramsForGet({ rowID: rowid }));
    },
    update(data) {
        return ajaxRemote.post('/dept/update', data);
    }
};


function _list(controller, pageIndex, pageSize) {
    return ajaxRemote.get('/' + controller + '/list', paramsForGet({ pageSize: pageSize, pageIndex: pageIndex }));
}
function _create(controller, data) {
    return ajaxRemote.post('/' + controller + '/create', data);
}
function _delete(controller, rowid) {
    return ajaxRemote.get('/' + controller + '/delete', paramsForGet({ rowID: rowid }));
}
function _update(controller, data) {
    return ajaxRemote.post('/' + controller + '/update', data);
}


function requestBase(controller) {
    this.list = function (pageIndex, pageSize) {
        return _list(controller, pageIndex, pageSize);
    };
    this.create = function (data) {
        return _create(controller, data);
    };
    this.delete = function (rowid) {
        return _delete(controller, rowid);
    };
    this.update = function (data) {
        return _update(controller, data);
    };
}
const requestUser = new requestBase('user');
// const requestUser = {
//     controller: 'user',
//     list(pageIndex, pageSize) {
//         return _list(this.controller, pageIndex, pageSize);
//     },
//     create(data) {
//         return _create(this.controller, data);
//     },
//     delete(rowid) {
//         return _delete(this.controller, rowid);
//     },
//     update(data) {
//         return _update(this.controller, data);
//     }
// };

export { requestModule, requestForm, system, ReqCommonDataCompany, requestCommonDataDept, requestUser };