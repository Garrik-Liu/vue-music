import axios from 'axios';
import { URL } from './config';

export function getSongLyric(id) {
    const url = URL.songLyric;

    const query = {
        key: '579621905',
        id: id,
    }

    return axios.get(url, {
        params: query
    });
}

export function getSongDetail(id) {
    const url = URL.songDetail;

    const query = {
        key: '579621905',
        id: id,
    }

    return axios.get(url, {
        params: query
    });
}