module.exports = {
    // options...
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
        public: 'http://codeserver:8085'
    },
}
