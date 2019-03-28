export const URL = {
    recommend: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    playlists: '/api/getPlaylists',
    playlistSongs: '/api/getPlaylistSongs',
    singerList: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
    singerDetail: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
    rankTopList: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    rankMusicList: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    songLyric: 'https://api.bzqll.com/music/tencent/lrc',
    songDetail: ' https://api.bzqll.com/music/tencent/song',
    hotkey: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
    search: 'https://api.bzqll.com/music/tencent/search'
}

export const CommonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp'
}

export const CommonOptions = {
    param: 'jsonpCallback'
}

export const ERR_OK = 0;