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

const dictMain={
    'zh-CN':{
        columns:{
            index:'序号',
            code:'代码',
            description:'描述',
            parentCode:'关联代码',
            parentName:'关联名称'
        },
        form:{
            codeLabel:'代码',
            codePlaceHolder:'请输入代码',
            descriptionLabel:'描述',
            descriptionPlaceHolder:'请输入描述',
            parentIDLable:'父级名称',
            parentCodeLabel:'父级代码'
        },
        validate:{
            emptyCode:'代码不能为空',
            emptyDescription:'描述不能为空',
            errDescription:'描述长度必须介于{0}和{1}之间',
        }
    },
    'zh-TW':{
      
    },
    'en-US':{
     
    }
};
const dictDetail={
    'zh-CN':{
        columns:{
            index:'序号',
            code:'代码',
            description:'描述',
            parentCode:'关联代码',
            parentName:'关联名称'
        },
        form:{
            codeLabel:'代码',
            codePlaceHolder:'请输入代码',
            descriptionLabel:'描述',
            descriptionPlaceHolder:'请输入描述',
            parentIDLable:'父级名称',
            parentCodeLabel:'父级代码'
        },
        validate:{
            emptyCode:'代码不能为空',
            emptyDescription:'描述不能为空',
            errDescription:'描述长度必须介于{0}和{1}之间',
        }
    },
    'zh-TW':{
      
    },
    'en-US':{
     
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
        create:'新增',
        apply:'应用',
        canccel:'取消',
        refresh:'刷新',
        sortTip:'排序模式已开启',
        dataTitleCreate:'数据新增',
        dataTitleCreateFormat:'{0} - 新增',
        dataTitleModify:'数据编辑',
        dataTitleModifyFormat:'{0} - 编辑',
        dataTitleView:'数据详情',
        dataTitleViewFormat:'{0} - 明细',
        noSelectData:'没有选择数据',
        apiReg:apiReg['zh-CN'],
        dictMain:dictMain['zh-CN'],
        dictDetail:dictDetail['zh-CN'],
        mainData:'主数据',
        detailData:'明细数据',
        failValidateForm:'表单验证失败',//NO
        saveSuccess:'保存成功',//NO
        deleteSuccess:'删除成功',//NO
        askTitleWarning:'警告',
        deleteWarning:'确定要删除【{0}】吗',
        deleteWarningWithDetail:'确定要删除【{0}】吗？删除以后明细也会清空',
    },
    'zh-TW': {
        mainData:'主数据',
        detailData:'明细数据',
        pageSize:'{0} 條/葉',
        login:'登陆',
        save: '保存',
        delete:'刪除',
        modify:'修改',
        import:'導入',
        create:'新增',
        apply:'應用',
        canccel:'取消',
        refresh:'刷新',
        sortTip:'排序模式已開啓',
        dataTitleCreate:'數據新增',
        dataTitleCreateFormat:'{0} - 新增',
        dataTitleModify:'數據編輯',
        dataTitleModifyFormat:'{0} - 編輯',
        dataTitleView:'數據詳情',
        dataTitleViewFormat:'{0} - 詳情',
        noSelectData:'沒有選擇數據',
        apiReg:apiReg['zh-TW'],
        dictMain:dictMain['zh-TW'],
        dictDetail:dictDetail['zh-TW'],
    },
    'en-US': {
        mainData:'mainData',
        detailData:'detail',
        pageSize:'{0} / page',
        login:'sign In',
        save: 'save',
        delete:'delete',
        modify:'edit',
        import:'import',
        create:'create',
        apply:'apply',
        canccel:'canccel',
        refresh:'refresh',
        sortTip:'sort status',
        dataTitleCreate:'data create',
        dataTitleCreateFormat:'{0} - create',
        dataTitleModify:'data modify',
        dataTitleModifyFormat:'{0} - modify',
        dataTitleView:'data detail',
        dataTitleViewFormat:'{0} - detail',
        noSelectData:'no select data',
        apiReg:apiReg['en-US'],
        dictMain:dictMain['en-US'],
        dictDetail:dictDetail['en-US'],
    }
};
