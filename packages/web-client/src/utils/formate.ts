// 格式化时间
export const formatGameTime = (time: number) => {
    // 毫秒级时间转成秒级时间
    const second = Math.floor(time / 1000)
    const minute = Math.floor(second / 60)
    const secondStr = second % 60
    const minuteStr = minute % 60

    return `${minuteStr < 10 ? `0${minuteStr}` : minuteStr}:${secondStr < 10 ? `0${secondStr}` : secondStr}`
}
