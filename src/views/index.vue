
<template>
    <div class="layout fullH">
        <div class="left" v-bind:class="classLeft">
            <div class="divFlag">
                <gzmenu active-name="1-2" theme="dark" class="menu" accordion :width="menuWidth"  :open-names="['1']" 
                v-on:mouseenter="showMenu()" v-on:mouseleave="hideMenu()" @on-select="routeTo">
                    <div class="menuHeader">
                        <div class="menuHeaderContent" @click="toggleClick"></div>
                    </div>
                    <div v-show="isMinMenu" :class="{'menu-hide-text': true}">
                      <div v-for="item in $parent.dataMenus" :key="item.name">
                        <MenuItem :name="item.name">
                          <Icon :type="item.icon" :size="iconSize"></Icon>
                          <span class="layout-text">{{item.text}}</span>
                        </MenuItem>
                      </div> 
                    </div>
                    <div v-show="isMinMenu===false">
                       <div v-for="item in $parent.dataMenus" :key="item.name">
                          <Submenu :name="item.name">
                            <template slot="title">
                                <Icon :type="item.icon"></Icon>
                                <span>{{item.text}}</span>
                            </template>
                            <div v-for="c in item.items" :key="c.name">
                                <MenuItem :name="c.name">{{c.text}}</MenuItem>
                            </div>
                          </Submenu>
                      </div> 

                       
                    </div>

                </gzmenu>
            </div>
        </div>
        <div class="content">
                <div class="layout-header ivu-menu-primary">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                      <BreadcrumbItem  v-for="item in dataBreadcrumb" :key="item">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                  <h1>{{$parent.storeData}}</h1>
                    <router-view></router-view>
                </div>
                <div class="layout-copy ">
                    2011-2016 &copy; TalkingData
                </div>
          
        </div>
    </div>
</template>
<style scoped>
.layout {
  width: 100%;
  height: 100%;
}

.left {
  float: left;
  height: 100%;
  overflow: hidden;
}

.left {
  transition: width 0.2s ease-in-out;
}

.leftNormal {
  width: 250px;
}

.leftFull {
  width: 50px;
}

.content {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #f5f7f9;
}

.content {
  transition: width 0.2s;
}

.divFlag {
  width: 100%;
  height: 100%;
}

.menuHeader {
  width: 100%;
  height: 60px;
  padding-top: 15px;
}

.menuHeader .menuHeaderContent {
  width: 90%;
  background: #5b6270;
  margin-left: auto;
  border-radius: 3px;
  height: 30px;
  margin-right: auto;
}

.menu {
  height: 100%;
}

.menu-hide-text .layout-text {
  display: none;
}

.menu-hide-text li {
  padding-left: 15px;
  padding-right: auto;
}

.layout-header {
  height: 60px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
  width: 100%;
  height: 31px;
  top: 60px;
  position: absolute;
  left: 0;
  right: 0;
}

.layout-content {
  min-height: 200px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  top: 91px;
  bottom: 48px;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
  height: 48px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<script>
import gzmenu from "../components/menu/index";
import Util from "../libs/util";

export default {
  components: {
    gzmenu
  },
  data() {
    return {
      bkStatus: false,
      isMinMenu: false,
      dataBreadcrumb: []
    };
  },
  created() {
    //debugger;f
    //this.$route.path
    if (this.$route.path.length > 1) {
      console.log("index.vue  created");
      var item = Util.searchJson(
        this.$parent.dataMenus,
        "items",
        parm => parm.routeName === this.$route.path
      );
      if (item) this.setBreadcrumb(item);
    }
  },
  computed: {
    menuWidth() {
      return this.isMinMenu ? "100%" : "250px";
      //return '100%';
    },
    iconSize() {
      return this.isMinMenu ? 24 : 14;
    },
    classLeft() {
      if (this.isMinMenu === true)
        return {
          leftFull: true
        };
      else
        return {
          leftNormal: true
        };
    }
  },
  methods: {
    showMenu() {
      this.bkStatus = this.isMinMenu;
      this.isMinMenu = false;
    },
    hideMenu() {
      if (this.bkStatus == true) {
        this.isMinMenu = true;
      }
    },
    toggleClick() {
      if (this.bkStatus === true) {
        this.isMinMenu = false;
        this.bkStatus = false;
      } else {
        this.isMinMenu = this.isMinMenu === false;
      }
    },
    handleStart() {
      this.$Modal.info({
        title: "Bravo",
        content: "Now, enjoy the convenience of iView."
      });
    },
    routeTo(e) {
      //var item = this.getNode(this.$parent.dataMenus, e);
      var item = Util.searchJson(
        this.$parent.dataMenus,
        "items",
        parm => parm.name === e
      );
      // this.dataBreadcrumb = [];
      // var v = item;
      // this.dataBreadcrumb.splice(0, 0, v.text);
      // while (v.parentNode) {
      //   this.dataBreadcrumb.splice(0, 0, v.parentNode.text);
      //   v = v.parentNode;
      // }
      this.setBreadcrumb(item);
      this.$router.push({ name: item.name });
    },
    setBreadcrumb(item) {
      this.dataBreadcrumb = [];
      var v = item;
      this.dataBreadcrumb.splice(0, 0, v.text);
      while (v.parentNode) {
        this.dataBreadcrumb.splice(0, 0, v.parentNode.text);
        v = v.parentNode;
      }
    },
    getNode(jsondata, name) {
      var node;
      //1.第一层 root 深度遍历整个JSON
      for (var i = 0; i < jsondata.length; i++) {
        var obj = jsondata[i];
        //没有就下一个
        if (!obj || !obj.name) {
          continue;
        }

        //2.有节点就开始找，一直递归下去
        if (obj.name == name) {
          //找到了与nodeId匹配的节点，结束递归
          return obj;
        } else {
          //3.如果有子节点就开始找
          if (obj.items && obj.items.length > 0) {
            //4.递归前，记录当前节点，作为parent 父亲
            //递归往下找
            var v = this.getNode(obj.items, name);
            if (v) {
              v.parentNode = obj;
              return v;
            }
          }
        }
      }
    }
  }
};
</script>