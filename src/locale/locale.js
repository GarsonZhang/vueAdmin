const apiReg={
    'zh-CN':{
        importMsg:'导入成功！新增API数量:{0}',
        deleteConfirm:'确定要删除【{0}】吗?',
        columns:{
            index:'序号',
            APIName:'接口名称',
            url:'接口URL',
            checkTypeName:'权限'
        }
    },
    'zh-TW':{
        importMsg:'導入成功！新增API數量:{0}',
        deleteConfirm:'確定要刪除【{0}】嗎?',
        columns:{
            index:'序號',
            APIName:'接口名稱',
            url:'接口URL',
            checkTypeName:'權限'
        }
    },
    'en-US':{
        importMsg:'Successful operation！New API quantity:{0}',
        deleteConfirm:'are you sure delete [ {0} ] ?',
        columns:{
            index:'index',
            APIName:'APIName',
            url:'url',
            checkTypeName:'type'
        }
    }
};


export default {
    'zh-CN': {
        pageSize:'{0} 条/页',
        login:'登陆',
        save: '保存',
        delete:'删除',
        modify:'修改',
        import:'导入',
        apiReg:apiReg['zh-CN']
    },
    'zh-TW': {
        pageSize:'{0} 條/葉',
        login:'登陆',
        save: '保存',
        delete:'刪除',
        modify:'修改',
        import:'導入',
        apiReg:apiReg['zh-TW']
    },
    'en-US': {
        pageSize:'{0} / page',
        login:'sign In',
        save: 'save',
        delete:'delete',
        modify:'edit',
        import:'import',
        apiReg:apiReg['en-US']
    }
};
