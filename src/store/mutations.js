import * as types from './mutation-type';

const mutations = {
    [types.SET_PLAYLIST](state, playList) {
        state.playList = playList;
    },
    [types.SET_PLAYING](state, playing) {
        state.playing = playing;
    },
    [types.SET_PLAY_FULL](state, playFull) {
        state.playFull = playFull;
    },
    [types.SET_PLAY_MODE](state, playMode) {
        state.playMode = playMode;
    },
    [types.SET_PLAY_INDEX](state, playIndex) {
        state.playIndex = playIndex;
    },
    [types.SET_PLAY_HISTORY](state, playHistory) {
        state.playHistory = playHistory;
    },

    [types.SET_MUSICLIST](state, musicList) {
        state.musicList = musicList;
    },
    [types.SET_MUSICLIST_ID](state, musicListId) {
        state.musicListId = musicListId;
    },
    [types.SET_MUSICLIST_BG](state, musicListBg) {
        state.musicListBg = musicListBg;
    },
    [types.SET_MUSICLIST_TITLE](state, musicListTitle) {
        state.musicListTitle = musicListTitle;
    },

    [types.SET_SEARCH_HISTORY](state, searchHistory) {
        state.searchHistory = searchHistory;
    }
}

export default mutations;