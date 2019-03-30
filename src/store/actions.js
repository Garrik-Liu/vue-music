import * as types from './mutation-type'

// 启动播放器
export const initPlayer = function({ commit }, { songs, index }) {
    commit(types.SET_PLAYLIST, songs);
    commit(types.SET_PLAY_INDEX, index);
    commit(types.SET_PLAY_FULL, true);
    commit(types.SET_PLAYING, true);
}

// 插入歌曲到播放列表
export const insertSongToList = function({ commit, state }, song) {
    let playlist = state.playList.concat();
    let filteredPlaylist = []

    playlist.forEach((item) => {
        if (song.mid !== item.mid) {
            filteredPlaylist.push(item);
        }
    })

    filteredPlaylist.push(song);

    commit(types.SET_PLAYLIST, filteredPlaylist);
    commit(types.SET_PLAY_INDEX, filteredPlaylist.length - 1);
}

// 设置音乐列表信息
export const setMusicListInfo = function({ commit }, { id, title, bgImg }) {
    commit(types.SET_MUSICLIST_ID, id);
    commit(types.SET_MUSICLIST_BG, bgImg);
    commit(types.SET_MUSICLIST_TITLE, title);
}

// 插入历史记录
export const insertHistory = function({ commit, state }, history, index) {
    let searchHistory = state.searchHistory.concat();
    let filteredHistory = [];

    searchHistory.forEach((item) => {
        if (history !== item) {
            filteredHistory.push(item);
        }
    })

    index = parseInt(index) ? index : 0;

    filteredHistory.splice(index, 0, history);

    commit(types.SET_SEARCH_HISTORY, filteredHistory)
}