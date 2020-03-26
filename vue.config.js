module.exports = {
    configureWebpack: {
        externals: {
            'BMapGL': 'BMapGL', // 高德地图配置
            'BMapGLLib': 'BMapGLLib' //动画插件配置
        }
    }
}