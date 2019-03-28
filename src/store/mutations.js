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

    [types.SET_SEARCH_HISTORY](state, searchHistory) {
        state.searchHistory = searchHistory;
    }
}

export default mutations;