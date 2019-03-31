var express = require('express')
var axios = require('axios')

var port = process.env.PORT || 8080

// 创建 express 实例
var app = express();

// 静态资源地址
app.use(express.static('./dist'));

var apiRoutes = express.Router();

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

// 获取指定歌单数据
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

// 使用路由中间件
app.use('/api', apiRoutes);

app.listen(port, function(err) {

    if (err) {
        console.log(err);
        return;
    }

    console.log('服务器启动, 监听' + port + '端口\n');
})