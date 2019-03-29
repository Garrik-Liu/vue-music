const path = require('path');
const express = require('express');
const axios = require('axios');


// 创建 express 服务器实例
const app = express();
const apiRoutes = express.Router();

// 获取歌单数据
apiRoutes.get('/getPlaylists', (req, res) => {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

    // header 欺骗
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.log(err);
    })
});

apiRoutes.get('/getPlaylistSongs', (req, res) => {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    // header 欺骗
    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal',
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((err) => {
        console.log(err);
    })
});

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
    },

    devServer: {
        before: function(app) {
            app.use('/api', apiRoutes);
        }
    }
}

// 路径解析
function resolve(dir) {
    return path.join(__dirname, dir);
}