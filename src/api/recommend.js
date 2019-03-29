import axios from 'axios';
import jsonp from 'common/js/jsonp';
import { CommonParams, CommonOptions, URL } from './config';

// 获取推荐专辑列表
export function getRecommends() {
    const url = URL.recommend;
    const query = Object.assign({}, CommonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    });

    return jsonp(url, query, CommonOptions);
}

// 获取歌单列表
export function getPlaylists() {
    const url = URL.playlists;

    const query = Object.assign({}, CommonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    });

    return axios.get(url, {
        params: query
    }).then((res) => {
        return Promise.resolve(res.data);
    })
}

export function getPlaylistSongs(disstid) {
    const url = URL.playlistSongs;
    const query = Object.assign({}, CommonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format: 'json'
    });

    return axios.get(url, {
        params: query
    }).then((res) => {
        return Promise.resolve(res.data);
    })
}