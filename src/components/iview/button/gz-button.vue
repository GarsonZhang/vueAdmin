<template>
    <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
        <Icon class="ivu-load-loop" type="load-c" v-if="loading"></Icon>
        <Icon :type="icon" v-if="icon && !loading"></Icon>
          <span v-if="showText">
            <span v-if="!loading">{{text}}</span>
            <span v-else>{{loadingText}}</span>
          </span>
    </button>
</template>
<script>
    import { oneOf } from '../.depend/utils/assist';

    const prefixCls = 'ivu-btn';

    export default {
        name: 'GzButton',
        components: { },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
                }
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                }
            },
            disabled: Boolean,
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset']);
                }
            },
            icon: String,
            long: {
                type: Boolean,
                default: false
            },
            text:{
                type:String,
                default:''
            },
            loadingText:{
                type:String,
                default:''
            },
            showText:{
                type:Boolean,
                default:true
            }
        },
        data () {
            return {
                loading: false
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: false
                    }
                ];
            }
        },
        methods: {
            handleClick (event) {
                this.loading=true;
                this.$emit('click', event,this);
            }
        },
        mounted () {
        }
    };
</script>
