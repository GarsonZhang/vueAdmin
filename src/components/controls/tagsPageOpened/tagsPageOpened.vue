<template>
    <div ref="scrollCon" @mousewheel="handlescroll" class="tags-outer-scroll-con">
        <div class="close-all-tag-con">
            <Dropdown trigger="click" @on-click="handleTagsOption">
                <Button size="small" type="primary" >
                    标签选项
                    <Icon type="arrow-down-b"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="clearAll">关闭所有</DropdownItem>
                    <DropdownItem name="clearOthers">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div ref="scrollBody" class="tags-inner-scroll-body" :style="{left: tagBodyLeft + 'px'}">
            <!-- <transition-group name="taglist-moving-animation"> -->
                <!-- <Tag type="dot" closable color="blue" @click.native="linkTo(item)">标签一</Tag>
                <Tag type="dot" closable color="blue">标签二</Tag>
                <Tag type="dot" closable color="blue">标签三</Tag>
                <Tag type="dot" closable color="blue">标签四</Tag> -->
                <Tag type="dot" v-for="item in pageTagsList" :key="item.name" :name="item.name" 
                    :closable="item.name!='home'"
                    @click.native="linkTo(item)"
                    @on-close="closePage(item)"
                     :color="item.name===currentPageName?'blue':'default'">
                {{getLang(item.meta)}}    
                </Tag>
                <!-- <Tag 
                    type="dot"
                    :key="item.name" 
                    :name="item.name" 
                    @on-close="closePage"
                    @click.native="linkTo(item)"
                    :closable="item.name==='home_index'?false:true"
                    :color="item.children?(item.children[0].name===currentPageName?'blue':'default'):(item.name===currentPageName?'blue':'default')"
                >{{ item.title }}</Tag> -->
            <!-- </transition-group> -->
        </div>
    </div>
</template>
<style scoped>
.tags-outer-scroll-con {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 10px;
  position: relative;
  box-shadow: 0 2px 1px 1px hsla(0, 0%, 39%, 0.1);
}
.close-all-tag-con {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 8px;
  text-align: center;
  width: 110px;
  height: 100%;
  /* background: #fff;
  box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1); */
  background: transparent;
  z-index: 500;
}
</style>

<script>
export default {
  name: "tagsPageOpened",
  data() {
    return {
      currentPageName: this.$route.name,
      tagBodyLeft: 0,
      currentScrollBodyWidth: 0,
      refsTag: [],
      tagsCount: 1,
      pageTagsList: []
    };
  },
  computed: {
    title() {
      return this.$store.state.currentTitle;
    },
    tagsList() {
      return this.$store.state.pageOpenedList;
    }
  },
  created() {
    // debugger;
    this.clearRouter();
    // var item = this.$utils.jsonSearch.search(
    //   this.$router.options.routes,
    //   "children",
    //   parm => parm.name === "home"
    // );
    // this.addRouter(item);
    this.addHome();
    this.addRouter();
    //
    // var  item = this.$utils.jsonSearch.search(
    //     this.$router.options.routes,
    //     "children",
    //     parm => parm.name === this.$route.name
    //   );
    //   if (item) this.addRouter(item);
  },
  methods: {
    getLang(item) {
      // debugger
      var text = "";
      switch (this.$lang) {
        case "zh-CN":
          text = item.title;
          break;
        case "zh-TW":
          text = item.title_tw;
          break;
        case "en-US":
          text = item.title_en;
          break;
        default:
          text = item.title_other;
          break;
      }
      if (this.$utils.isNULL(text)) text = item.title;
      return text;
    },
    addHome() {
      var item = this.$utils.jsonSearch.search(
        this.$router.options.routes,
        "children",
        parm => parm.name === "home"
      );

      //  var cName= this.$route.matched[1].components.default.name;
      this.$store.commit("increateTag", "vue-home");
      this.pageTagsList.push(item);
    },
    addRouter() {
      var _path = this.getPath(this.$route);
      var index = _path.indexOf(":");
      var argu = {};
      // debugger;
      // while (index > 0) {
      //   var next_index = _path.indexOf(":", index + 1);
      //   var key = "";
      //   if (next_index > 0) key = _path.substring(index + 1, next_index);
      //   else key = _path.substring(index + 1);
      //   argu[key] = this.$route.params[key];
      //   index = next_index;
      // }
      // if (!this.$utils.isNULLObject(argu)) this.$route.meta.argu = argu;
      // debugger
      var v = this.$utils.jsonSearch.search(
        this.pageTagsList,
        null,
        parm => parm.name === this.$route.name
      );
      if (v) {
        if (this.$route.params) {
          for(var key in v.params){
            v.params[key]=this.$route.params[key];
          }
          // v.params = this.$route.params;
        }
        return;
      } else {
        // debugger
        // var cName= this.$route.matched[1].components.default.name;
        this.$store.commit("increateTag", this.getCName(this.$route));
        this.pageTagsList.push(this.$route);
      }
    },
    getPath(route) {
      return route.matched[1].path;
    },
    getCName(route) {
      if (route.matched[1].components.default.name)
        return route.matched[1].components.default.name;
      else {
        // debugger
        throw "页面必须指定name属性," + route.meta.src;
      }
    },
    clearRouter() {
      this.$store.commit("clearAllTags");
    },
    removeTags(name) {
      //this.$store.commit('closePage', item.name);
      var v = this.$utils.jsonSearch.search(
        this.pageTagsList,
        null,
        parm => parm.name === name
      );
      if (v) {
        var index = this.pageTagsList.indexOf(v);
        if (index > -1) {
          this.pageTagsList.splice(index, 1);
        }
      }
    },
    removeAllTags() {
      this.pageTagsList.splice(1);
    },
    removeOtherTags() {
      let currentIndex = -1;
      for (var i = 0; i < this.pageTagsList.length; i++) {
        if (this.pageTagsList[i].name === this.$route.name) {
          currentIndex = i;
          break;
        }
      }
      if (currentIndex === 0) {
        this.removeAllTags();
      } else {
        this.pageTagsList.splice(currentIndex + 1);
        this.pageTagsList.splice(1, currentIndex - 1);
      }
    },
    closePage(route) {
      var cName = this.getCName(route);
      // this.$store.state.excludePage = cName;
      this.$store.commit("closePage", cName);
      this.removeTags(route.name);
      if (route.name === this.$route.name) {
        this.$nextTick(_ => {
          this.$store.state.excludePage = "";
          this.$router.push({
            name: this.pageTagsList[0].name
          });
        });
      }
    },
    linkTo(item) {
      if (item.params) {
        this.$router.push({
          name: item.name,
          params: item.params
        });
      } else {
        this.$router.push({
          name: item.name
        });
      }
    },
    handlescroll(e) {
      let left = 0;
      if (e.wheelDelta > 0) {
        left = Math.min(0, this.tagBodyLeft + e.wheelDelta);
      } else {
        if (
          this.$refs.scrollCon.offsetWidth - 100 <
          this.$refs.scrollBody.offsetWidth
        ) {
          if (
            this.tagBodyLeft <
            -(
              this.$refs.scrollBody.offsetWidth -
              this.$refs.scrollCon.offsetWidth +
              100
            )
          ) {
            left = this.tagBodyLeft;
          } else {
            left = Math.max(
              this.tagBodyLeft + e.wheelDelta,
              this.$refs.scrollCon.offsetWidth -
                this.$refs.scrollBody.offsetWidth -
                100
            );
          }
        } else {
          this.tagBodyLeft = 0;
        }
      }
      this.tagBodyLeft = left;
    },
    // 关闭其他 或关闭全部
    handleTagsOption(type) {
      if (type === "clearAll") {
        this.$store.commit("clearOtherTags", this.$route.meta.cName);
        this.removeOtherTags();
        if (this.$route.name != this.pageTagsList[0].name)
          this.closePage(this.$route.name);
      } else {
        this.$store.commit("clearOtherTags", this.$route.mate.cName);
        this.removeOtherTags();
      }
      this.tagBodyLeft = 0;
    }
  },
  mounted() {},
  watch: {
    $route(to) {
      // debugger
      this.currentPageName = this.$route.name;
      this.addRouter();
    }
  }
};
</script>
