export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }
}

// [数据]:创建 Song 实例的工厂方法
export function createSong({ songid, songmid, singer, songname, albumname, interval, albummid, albumpic, songurl }) {
    return new Song({
        id: songid,
        mid: songmid,
        singer: filterSinger(singer),
        name: songname,
        album: albumname,
        duration: interval,
        image: albumpic || `https://y.gtimg.cn/music/photo_new/T002R300x300M000${ albummid }.jpg?max_age=2592000`,
        url: songurl || `https://api.bzqll.com/music/tencent/url?key=579621905&id=${ songmid }`
    })
}

// [数据]:获取每首歌的歌手数组
function filterSinger(data) {
    let singerList = [];

    if (Array.isArray(data)) {
        data.forEach((item) => {
            singerList.push(item.name);
        })
    } else {
        singerList.push(data);
    }

    return singerList;
}

// 格式化处理歌词, 返回对象类型
export function formatLyricObj(lyric) {
    let lyricObj = {}
    lyric.split("\n").forEach((item) => {
        let subLyricArr = item.split("]");
        let timeStr = subLyricArr[0].substring(1);
        let timeStrArr = timeStr.split(":");
        let lyric = subLyricArr[1];

        if (!isNaN(parseFloat(timeStrArr[0]))) {
            let min = parseFloat(timeStrArr[0]);
            let sec = parseFloat(timeStrArr[1]);
            let milisec = min * 60 * 1000 + sec * 1000;
            lyricObj[milisec] = lyric;

        }
    })

    return lyricObj;
}

// 格式化处理歌词, 返回数组类型
export function formatLyric(lyric) {

    return lyric.split("\n").map((item) => {
        let subLyricArr = item.split("]");
        let timeStr = subLyricArr[0].substring(1);
        let timeStrArr = timeStr.split(":");
        let lyric = subLyricArr[1];

        if (!isNaN(parseFloat(timeStrArr[0]))) {
            let min = parseFloat(timeStrArr[0]);
            let sec = parseFloat(timeStrArr[1]);
            let milisec = min * 60 * 1000 + sec * 1000;

            return {
                time: milisec,
                lyric
            }
        }
    }).slice(5);
}