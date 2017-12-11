export default {
    data() {
        return {
            _authorize: 0,
        };
    },
    created() {
        // debugger
        this._authorize = this.$store.authorizeDataCache[this.$route.name];
    },
    methods: {
        VerifyPermissions(authorize) {
            // debugger
            return this._authorize & authorize === authorize;
        }
    }
};