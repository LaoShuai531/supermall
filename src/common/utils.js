// 防抖
export function debounce(func, delay) {
    let timer = null

    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

/**
 * 将时间戳转换为真实日期的函数
 */
// 正则表达式是干什么的？ 字符串匹配利器（规则太多）
export function formatDate(date, fmt) {
    // 1. 获取年份
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 2. 获取
    // M+ -> 正则表达式中的一个规则
    // ? 表示可有可无，至多一个；* 表示可有可无，多了不限；+ 表示至少一个，多了不限
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};