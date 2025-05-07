import {useEffect, useRef, useState} from "react";

// interface IGameStage {
//     // 时间
//     time: number,
//     // 阶段
//     stage: number
// }

export default () => {
    // 规则一 分段
    // const [gameStage, setGameStage] = useState<IGameStage[]>([])
    // 当前时间
    let [time, setTime] = useState(0)
    let currentTime = useRef(time)

    useEffect(() => {
        currentTime.current = time
        console.log('time', time)
    }, [time])

    // 设置时间
    const setGameTime = (time: number) => {
        setTime(currentTime => currentTime + time)
    }

    // 开始计时
    let timer = useRef<NodeJS.Timeout>(null!)
    const startTimer = () => {
        timer.current && clearInterval(timer.current)
        timer.current = setInterval(() => {
            console.log('currentTime', currentTime.current)
            setTime(currentTime.current + 1000)
            console.log(currentTime.current)
        }, 1000)
    }

    // 暂停计时
    const pauseTimer = () => {
        timer.current && clearInterval(timer.current)
    }

    // 重置比赛
    const resetTimer = () => {
        pauseTimer()
        setTime(0)
    }

    return {
        time,
        setGameTime,
        startTimer,
        pauseTimer,
        resetTimer
    }
}
