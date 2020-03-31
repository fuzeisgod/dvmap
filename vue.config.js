module.exports = {
    configureWebpack: {
        externals: {
            'BMap': 'BMap' // 百度地图配置
        }
    }
    // devServer: {
    //     proxy: {
    //         '/article': {
    //             target: 'http://localhost:7001/',
    //             changeOrigin: true,
    //             ws: true
    //         }
    //     }
    // }
}