import objectAssign from './merge';
import { markNodeData, NODE_KEY } from './util';

const reInitChecked = function (node) {
    const siblings = node.childNodes;

    let all = true;
    let none = true;

    for (let i = 0, j = siblings.length; i < j; i++) {
        const sibling = siblings[i];
        if (sibling.checked !== true || sibling.indeterminate) {
            all = false;
        }
        if (sibling.checked !== false || sibling.indeterminate) {
            none = false;
        }
    }

    if (all) {
        node.setChecked(true);
    } else if (!all && !none) {
        node.setChecked('half');
    } else if (none) {
        node.setChecked(false);
    }
};

const getPropertyFromData = function (node, prop) {
    const props = node.store.props;
    const data = node.data || {};
    const config = props[prop];

    if (typeof config === 'function') {
        return config(data, node);
    } else if (typeof config === 'string') {
        return data[config];
    } else if (typeof config === 'undefined') {
        return '';
    }
};

let nodeIdSeed = 0;

export default class Node {
    constructor(options) {
        this.id = nodeIdSeed++;
        this.text = null;
        this.checked = false;
        this.selected=false;
        this.indeterminate = false;
        this.data = null;
        this.expanded = false;
        this.fatheExpanded = true;
        this.parent = null;
        this.visible = true;
        for (let name in options) {
            if (options.hasOwnProperty(name)) {
                this[name] = options[name];
            }
        }

        // internal
        this.level = 0;
        this.loaded = false;
        this.childNodes = [];
        this.loading = false;

        if (this.parent) {
            this.level = this.parent.level + 1;
            if (this.parent.expanded === false && this.parent.level !== 0) {
                this.fatheExpanded = false;
            }
        }

        const store = this.store;
        if (!store) {
            throw new Error('[Node]store is required!');
        }
        store.registerNode(this);

        const props = store.props;
        if (props && typeof props.isLeaf !== 'undefined') {
            const isLeaf = getPropertyFromData(this, 'isLeaf');
            if (typeof isLeaf === 'boolean') {
                this.isLeafByUser = isLeaf;
            }
        }

        if (store.lazy !== true && this.data) {
            this.setData(this.data);

            if (store.defaultExpandAll) {
                this.expand();
            }
        } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
            this.expand();
        }

        if (!this.data) return;
        const defaultExpandedKeys = store.defaultExpandedKeys;
        const key = store.key;
        if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
            this.expand(null, store.autoExpandParent);
        }

        if (key && store.currentNodeKey && this.key === store.currentNodeKey) {
            store.currentNode = this;
        }

        if (store.lazy) {
            store._initDefaultCheckedNode(this);
        }

        this.updateLeafState();
    }

    setData(data) {
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }

        this.data = data;
        this.childNodes = [];

        let children;
        if (this.level === 0 && this.data instanceof Array) {
            children = this.data;
        } else {
            children = getPropertyFromData(this, 'children') || [];
        }

        for (let i = 0, j = children.length; i < j; i++) {
            this.insertChild({ data: children[i] });
        }
    }

    updateData(data) {
        if (!Array.isArray(data)) {
            markNodeData(this, data);
        }

        for (let name in data) {
            if (data.hasOwnProperty(name)) {
                this.data[name] = data[name];
            }
        }
    }

    get label() {
        return getPropertyFromData(this, 'label');
    }

    get icon() {
        return getPropertyFromData(this, 'icon');
    }

    get key() {
        const nodeKey = this.store.key;
        if (this.data) return this.data[nodeKey];
        return null;
    }

    moveNode(index) {
        const parent = this.parent;
        let thisIndex = parent.childNodes.indexOf(this);
        let toIndex = index + thisIndex;

        if (typeof index !== 'undefined' && toIndex >= 0 && toIndex < parent.childNodes.length) {
            parent.childNodes[thisIndex] = parent.childNodes.splice(index + thisIndex, 1, this)[0];
        }
    }

    insertChild(child, index) {
        if (!child) throw new Error('insertChild error: child is required.');

        if (!(child instanceof Node)) {
            objectAssign(child, {
                parent: this,
                store: this.store
            });
            child = new Node(child);
        } else {
            child.parent = this;
        }

        child.__LevelDepth(this.level + 1);

        if (typeof index === 'undefined' || index < 0) {
            this.childNodes.push(child);
        } else {
            this.childNodes.splice(index, 0, child);
        }

        this.updateLeafState();
    }

    insertBefore(child, ref) {
        let index;
        if (ref) {
            index = this.childNodes.indexOf(ref);
        }
        this.insertChild(child, index);
    }

    insertAfter(child, ref) {
        let index;
        if (ref) {
            index = this.childNodes.indexOf(ref);
            if (index !== -1) index += 1;
        }
        this.insertChild(child, index);
    }

    removeChild(child, notDestroy) {
        const index = this.childNodes.indexOf(child);

        if (index > -1) {
            if (!notDestroy) {
                this.store && this.store.deregisterNode(child);
            }
            child.parent = null;
            this.childNodes.splice(index, 1);
        }

        this.updateLeafState();
    }

    removeChildByData(data) {
        let targetNode = null;
        this.childNodes.forEach(node => {
            if (node.data === data) {
                targetNode = node;
            }
        });

        if (targetNode) {
            this.removeChild(targetNode);
        }
    }

    expand(callback, expandParent) {
        const done = () => {
            if (expandParent) {
                let parent = this.parent;
                while (parent.level > 0) {
                    parent.expanded = true;
                    parent = parent.parent;
                }
            }
            this.expanded = true;
            this._setFatheExpanded(this, true);
            if (callback) callback();
        };

        if (this.shouldLoadData()) {
            this.loadData((data) => {
                if (data instanceof Array) {
                    done();
                }
            });
        } else {
            done();
        }
    }

    doCreateChildren(array, defaultProps = {}) {
        array.forEach((item) => {
            this.insertChild(objectAssign({ data: item }, defaultProps));
        });
    }

    collapse() {
        this.expanded = false;
        this._setFatheExpanded(this, false);
    }

    shouldLoadData() {
        return this.store.lazy === true && this.store.load && !this.loaded;
    }

    updateLeafState() {
        if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
            this.isLeaf = this.isLeafByUser;
            return;
        }
        const childNodes = this.childNodes;
        if (!this.store.lazy || (this.store.lazy === true && this.loaded === true)) {
            this.isLeaf = !childNodes || childNodes.length === 0;
            return;
        }
        this.isLeaf = false;
    }
    setSelected() {
        this.store._getAllNodes().forEach(n=>{
           
            n.selected=n==this;
        });
        //this.selected = true;
    }
    setChecked(value, deep) {
        this.indeterminate = value === 'half';
        this.checked = value === true;

        const handleDescendants = () => {
            if (deep) {
                const childNodes = this.childNodes;
                for (let i = 0, j = childNodes.length; i < j; i++) {
                    const child = childNodes[i];
                    child.setChecked(value !== false, deep);
                }
            }
        };

        if (!this.store.checkStrictly && this.shouldLoadData()) {
            // Only work on lazy load data.
            this.loadData(() => {
                handleDescendants();
            },
                {
                    checked: value !== false
                });
        } else {
            handleDescendants();
        }

        const parent = this.parent;
        if (!parent || parent.level === 0) return;

        if (!this.store.checkStrictly) {
            reInitChecked(parent);
        }
    }

    getChildren() { // this is data
        const data = this.data;
        if (!data) return null;

        const props = this.store.props;
        let children = 'children';
        if (props) {
            children = props.children || 'children';
        }

        if (data[children] === undefined) {
            data[children] = null;
        }

        return data[children];
    }

    updateChildren() {
        const newData = this.getChildren() || [];
        const oldData = this.childNodes.map((node) => node.data);

        const newDataMap = {};
        const newNodes = [];

        newData.forEach((item, index) => {
            if (item[NODE_KEY]) {
                newDataMap[item[NODE_KEY]] = { index, data: item };
            } else {
                newNodes.push({ index, data: item });
            }
        });

        oldData.forEach((item) => {
            if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
        });

        newNodes.forEach(({ index, data }) => {
            this.insertChild({ data }, index);
        });

        this.updateLeafState();
    }

    loadData(callback, defaultProps = {}) {
        if (this.store.lazy === true && this.store.load && !this.loaded && !this.loading) {
            this.loading = true;

            const resolve = (children) => {
                this.loaded = true;
                this.loading = false;
                this.childNodes = [];

                this.doCreateChildren(children, defaultProps);

                this.updateLeafState();
                if (callback) {
                    callback.call(this, children);
                }
            };

            this.store.load(this, resolve);
        } else {
            if (callback) {
                callback.call(this);
            }
        }
    }

    _setFatheExpanded(node, b) {
        if (b) {
            node.childNodes.forEach((node) => {
                node.fatheExpanded = b;
                node._setFatheExpanded(node, node.expanded);
            });
        } else {
            node.childNodes.forEach((node) => {
                node.fatheExpanded = false;
                node._setFatheExpanded(node, false);
            });
        }
    }

    __LevelDepth(level) {
        this.level = level;
        this.childNodes.forEach(node => node.__LevelDepth(level + 1));
    }

    _getData() {

    }
}
