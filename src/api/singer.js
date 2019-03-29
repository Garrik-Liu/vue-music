import jsonp from 'common/js/jsonp';
import { CommonParams, CommonOptions, URL } from './config';

// 获取歌手列表
export function getSingerList() {
    const url = URL.singerList;

    const query = Object.assign({}, CommonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })

    return jsonp(url, query, CommonOptions);
}

// 获取指定歌手信息
export function getSingerDetail(id) {
    const url = URL.singerDetail;

    const query = Object.assign({}, CommonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: id
    })

    return jsonp(url, query, CommonOptions);
}