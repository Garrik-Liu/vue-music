import JSONP from 'jsonp';

export default function jsonp(url, query, option) {
    // 检验 URL 是否末尾带 '?' 字符
    // 并拼接查询字符

    if (url.indexOf('?') === -1) {
        url = url + '?' + concatQuery(query);
    } else {
        url = url + concatQuery(query);
    }


    return new Promise((resolve, reject) => {
        JSONP(url, option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        })
    })
}

// 拼接查询字符
function concatQuery(query) {
    let result = '';

    // 进行拼接
    for (var key in query) {
        let value = query[key] !== undefined ? query[key] : '';
        result += `&${key}=${encodeURIComponent(value)}`;
    }

    // 去掉拼接后查询字符的第一个 '&' 字符
    result = result ? result.substring(1) : '';

    return result;
}