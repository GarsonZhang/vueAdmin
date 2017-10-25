import axios from 'axios';
import env from '../config/env';
import Routers from '../router';
import menuData from '../data/menu.js'

let util = {

};
util.title = function (title) {
	title = title ? title + ' - Home' : 'iView project';
	window.document.title = title;
};
util.searchJson = function (jsondata, childKey, filter) {
	var node;
	//1.第一层 root 深度遍历整个JSON
	for (var i = 0; i < jsondata.length; i++) {
		var obj = jsondata[i];
		//2.有节点就开始找，一直递归下去
		if (filter(obj)) {
			//找到了与nodeId匹配的节点，结束递归
			return obj;
		} else {
			
			if (childKey) {
				//3.如果有子节点就开始找
				if (obj[childKey] && obj[childKey].length > 0) {
					//4.递归前，记录当前节点，作为parent 父亲
					//递归往下找
					var v = this.searchJson(obj[childKey],childKey, filter);
					if (v) {
						v.parentNode = obj;
						return v;
					}
				}
			}
		}
	}
};
util.convertRouteMap = function (menuData) {

	var _route = [];
	//var route = this.searchJson(_route, null, item => item.name === "home");
	menuData.forEach(function (module) {

		var menuModule={
			name:module.name,
			meta: {
				title: module.text
			},
			path:'/authority'+module.name,
			component: getPromisedComponent(module.componentPath, module.componentName),
			children:[]
		};

		module.items.forEach(function (item) {
			
			menuModule.children.push({
				name: item.name,
				path: item.routeName,
				meta: {
					title: item.text
				},
				component: getPromisedComponent(item.componentPath, item.componentName)
			});
		})

		_route.push(menuModule);

	});
	function getPromisedComponent(module, url) {
		return function (resolve, reject) {
			if (module === "components")
				require(["../components/" + url], resolve)
			else if (module === "views")
				require(["../views/" + url], resolve)
		}
	}

	return _route
};
const ajaxUrl = env === 'development' ?
	window.location.origin :
	env === 'production' ?
		'https://www.url.com' :
		'https://debug.url.com';

util.ajax = axios.create({
	baseURL: ajaxUrl,
	timeout: 10000
});

util.ajaxRemote = axios.create({
	baseURL: "http://localhost:4462/api",
	timeout: 10000
});


util.deepCopy=function(obj){
    if(typeof obj != 'object'){
        return obj;
    }
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = this.deepCopy(obj[attr]);
    }
    return newobj;
}

export default util;