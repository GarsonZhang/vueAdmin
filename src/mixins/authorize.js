export default {
    data() {
        return {
            _authorize: 0,
        };
    },
    created() {
        // debugger
        if (this.$store.authorizeDataCache)
            this._authorize = this.$store.authorizeDataCache[this.$route.name];
        // console.log('routeName:'+this.$route.name+'  Authorize:'+this._authorize);
    },
    methods: {
        VerifyPermissions(authorize) {
            // debugger
            return (this._authorize & authorize) === authorize;
        }
    }
};