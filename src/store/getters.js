export const playList = (state) => { return state.playList }

export const playing = (state) => { return state.playing }

export const playFull = (state) => { return state.playFull }

export const playIndex = (state) => { return state.playIndex }

export const playHistory = (state) => { return state.playHistory }

export const playMode = (state) => { return state.playMode }

// 正在播放的歌曲
export const playSong = (state) => {
    return state.playlist[state.playIndex] || {};
}

export const searchHistory = (state) => {
    return state.searchHistory
}