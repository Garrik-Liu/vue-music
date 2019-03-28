const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                // @/ 是 src/ 的别名
                data: `
              @import "@/common/style/variable.scss";
              @import "@/common/style/mixin.scss";
              `
            }
        }
    },

    configureWebpack: {
        resolve: {
            // 路径别名
            alias: {
                'src': resolve('src'),
                'components': resolve('src/components'),
                'api': resolve('src/api'),
                'common': resolve('src/common'),
                'store': resolve('src/store'),
                'router': resolve('src/router'),
            }
        }
    }
}

// 路径解析
function resolve(dir) {
    return path.join(__dirname, dir);
}