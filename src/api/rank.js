import jsonp from 'common/js/jsonp';
import { CommonParams, CommonOptions, URL } from './config';

// 获取排行榜数据
export function getTopList() {
    const url = URL.rankTopList;

    const query = Object.assign({}, CommonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })

    return jsonp(url, query, CommonOptions)
}

// 获取指定排行榜歌单数据
export function getRankData(topid) {
    const url = URL.rankMusicList;

    const query = Object.assign({}, CommonParams, {
        topid,
        needNewCode: 1,
        uin: 0,
        tpl: 3,
        page: 'detail',
        type: 'top',
        platform: 'h5'
    })

    return jsonp(url, query, CommonOptions)
}