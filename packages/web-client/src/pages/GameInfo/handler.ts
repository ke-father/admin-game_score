import { useNavigate } from "react-router-dom";
import {useGame} from "@/contexts/GameContext";

export default () => {
    const { startTimer, pauseTimer, resetTimer } = useGame()
    const navigator = useNavigate()

    // 关于返回按钮点击
    const handleBackClick = () => {
        navigator(-1)
    }

    // 关于开始比赛按钮点击
    const handleStartClick = () => {
        // TODO 开始比赛
        startTimer()
        // TODO 发起请求开始比赛
        // TODO 开始计时
    }

    // 关于比赛暂停按钮点击
    const handlePauseClick = () => {
        pauseTimer()
    }

    // 关于比分重置按钮点击
    const handleResetClick = () => {
        resetTimer()
    }

    // 关于分享按钮点击
    const handleShareClick = () => {}

    return {
        handleBackClick,
        handleStartClick,
        handlePauseClick,
        handleResetClick,
        handleShareClick
    }
}

