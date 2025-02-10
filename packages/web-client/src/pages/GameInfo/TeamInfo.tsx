import React, {useRef} from "react";
import Animation from "@components/Animation";
import {Button} from "antd";
import {IScoreRef} from "@components/Animation/Score";
import {IStatusRef} from "@components/Animation/Status";

interface IDefaultCard {
    children: React.ReactNode
}
const DefaultCard: React.FC<IDefaultCard> = ({ children }) => {
    return (
        <div className="default-card">
            { children }
        </div>
    )
}

// 队伍操作
export interface ITeamInfo {
    TeamName?: string
    TeamScore: number
}
export interface ITeamInfoProps {
    teamId: number | string
    TeamInfo: ITeamInfo
    onScoreChange: (teamId: number | string, currentScore: number, getScore: number) => void
}
export const TeamInfo: React.FC<ITeamInfoProps> = ({ TeamInfo, onScoreChange, teamId }) => {
    const TeamName = TeamInfo?.TeamName || '队伍名称'
    // 得分组件实例
    const ScoreRef = useRef<IScoreRef>(null!)
    // 暂停组件实例
    const pauseStatusRef = useRef<IStatusRef>(null!)
    // 犯规组件实例
    const foulStatusRef = useRef<IStatusRef>(null!)

    // 加分
    const addScore = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            // 获取按钮绑定值
            const score = Number(e.currentTarget.getAttribute('data-score'))
            // 加分 获取当前分数与得分
            let [currentScore, getScore] = ScoreRef.current.addScore(score)
            onScoreChange(teamId, currentScore, getScore)
        } catch (e) {
            console.log(e)
        }
    }

    // 犯规
    const handleFoul = () => {

    }

    // 暂停
    const handlePause = () => {}

    return (
        <DefaultCard>
            <div className="team-main">
                <div className="team-name">{TeamName}</div>

                {/*队伍得分*/}
                <Animation.Score ref={ScoreRef} initScore={TeamInfo.TeamScore}></Animation.Score>

                {/*队伍犯规与暂停状态*/}
                <div className="team-status">
                    <div className="team-status--item team-status--pause">
                        <span>暂停</span>
                        {/*暂停状态*/}
                        <Animation.Status ref={pauseStatusRef} initStatus={3} type="DESC"></Animation.Status>
                    </div>

                    <div className="team-status--item team-status--foul">
                        <span>犯规</span>
                        {/*犯规状态*/}
                        <Animation.Status ref={foulStatusRef} initStatus={0}></Animation.Status>
                    </div>
                </div>

                {/*队伍操作*/}
                <div className="team-handler">
                    <Button data-score={1} onClick={addScore}>加1分</Button>
                    <Button data-score={2} onClick={addScore}>加2分</Button>
                    <Button data-score={3} onClick={addScore}>加3分</Button>
                    <Button onClick={handlePause}>暂停</Button>
                    <Button onClick={handleFoul}>犯规</Button>
                </div>
            </div>
        </DefaultCard>
    )
}
