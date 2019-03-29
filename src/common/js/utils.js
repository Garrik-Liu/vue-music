// 计算 ScrollView 举例可视区域顶部举例的百分比
export function calScrollToTopPercent(pos, offsetTop) {
    let y = pos.y;
    let delta = y + offsetTop;

    delta = delta < 0 ? 0 : delta;
    delta = delta > offsetTop ? offsetTop : delta;

    let percent = parseFloat((1 - delta / offsetTop).toFixed(2));
    return percent;
}

export function formatSongTime(time = 0) {
    time = Math.floor(time);

    let min = Math.floor(time / 60).toString();
    if (min.length === 1) {
        min = '0' + min;
    }

    let sec = Math.ceil(time % 60).toString();
    if (sec.length === 1) {
        sec = '0' + sec;
    }

    return `${min}:${sec}`;
}