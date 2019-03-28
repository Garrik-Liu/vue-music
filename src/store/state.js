import { PLAY_MODE } from 'common/js/config';

const state = {
    // 播放列表
    playList: {},
    // 音乐播放状态
    playing: false,
    // 播放页面是否展开
    playFull: false,
    // 正在播放音乐索引
    playIndex: 0,
    // 播放历史
    playHistory: [],
    // 音乐播放模式
    palyMode: PLAY_MODE.sequence,

    // 搜索历史
    searchHistory: []
}

export default state;