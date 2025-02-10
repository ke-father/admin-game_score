import {forwardRef, useImperativeHandle, useState} from "react";
import './index.scss'
export interface IScoreProps {
    initScore: number

}
export interface IScoreRef {
    addScore: (getScore: number) => [number, number]
    resetScore: (currentScore: number) => [number]
}
export default forwardRef<IScoreRef, IScoreProps>(function ({ initScore }, ref) {
    // 得分状态
    const [score, setScore] = useState(initScore)
    useImperativeHandle(ref, () => ({
        // 添加得分
        addScore (getScore: number) {
            setScore(score + getScore)
            return [score, getScore]
        },
        resetScore (currentScore: number) {
            setScore(currentScore)
            return [score]
        }
    }))

    return (
        <div className="score">{score}</div>
    )
})
