// 时间点
type ITimePoint = `${number}:${number}`

// 某个时间点详情
type ITimePointItem = {
    pointsScored: number,
    fouls: boolean
}

// 得分记录
type ITimeRecord = {
    // 得分以时间点为key
    [key: ITimePoint]: ITimePointItem
}

export default class TimeRecord {
    // 得分记录
    totalPointsScored: number = 0
    // 犯规记录
    totalFouls: number = 0
    // 得分记录
    timeRecords: ITimeRecord
}
