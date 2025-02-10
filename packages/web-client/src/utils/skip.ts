// 整理跳转url
export const formatSkipQueryData = (url: string, data: Record<string, any>) => {
    let str = '?'
    for (let key in data) {
        str += `${key}=${data[key]}&`
    }

    // 去除str第一个字符
    str = str.slice(0,-1)

    return url + str
}
