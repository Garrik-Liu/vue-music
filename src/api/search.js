import jsonp from 'common/js/jsonp';
import axios from 'axios';
import { CommonParams, CommonOptions, URL } from './config';

export function getHotKey() {
    const url = URL.hotkey;

    const query = Object.assign({}, CommonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })

    return jsonp(url, query, CommonOptions)
}

export function getSearch(s, limit = 20) {
    const url = URL.search;

    const query = {
        key: '579621905',
        s,
        limit
    }

    return axios.get(url, {
        params: query
    });
}