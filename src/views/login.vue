<template>
    <Card class="a">
        <p slot="title">系统登录</p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                <Button type="ghost" @click="handleReset('formInline')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<style scoped>
html,
body {
    height: 100%;
}

.divContent {
    height: 100%;
}

.a {
    /* width: 320px;
    height: 230px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0; */
    width: 320px;
    height: 230px;
    margin: auto;
    margin-top: 10%;
}
</style>

<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('提交成功!');
                    //http://www.cnblogs.com/wisewrong/p/6277262.html
                    /*
                    //  字符串
                        this.$router.push('/home/first')
                        // 对象
                        this.$router.push({ path: '/home/first' })
                        // 命名的路由
                        this.$router.push({ name: 'home', params: { userId: wise }})
                    */
                    this.$router.push({ name: 'home'});
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>
