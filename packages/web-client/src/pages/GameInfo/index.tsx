import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom'
// import FloatingBackCard from "@components/FloatingBackCard";
import './style.scss'
import {Button, Popover} from "antd";
import {CaretRightOutlined, LinkOutlined, RedoOutlined, ReloadOutlined, UndoOutlined} from "@ant-design/icons";
import {TeamInfo} from './TeamInfo.tsx'
import ToolTip from "@components/ToolTip";
import {formatGameTime} from "@utils/formate.ts";
import useGameHandler from './handler.ts'
import { useGame } from "@/contexts/GameContext";
import QRCode from "@components/QRCode";
import GameInfoHeader from "@components/GameModule/InfoHeader";


const GameInfo = (...args: any[]) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = useParams()

    console.log('args', args, '\n', 'location', location, '\n', 'navigate', navigate)
    console.log('params', params, '\n', 'searchParams', searchParams.get('gameId'), '\n')

    // 时间相关
    const {
        time,
        setGameTime,
        constructorState
    } = useGame()

    // 操作相关
    const {
        handleStartClick,
        handlePauseClick,
        handleResetClick
    } = useGameHandler()

    // 关于比赛计时
    const handleGameTime = () => {
        return formatGameTime(time)
    }

    // 关于返回键点击
    // const handleBackClick = () => {
    //     navigate(-1)
    // }

    const TeamData = constructorState([
        {
            TeamName: '队伍1',
            TeamScore: 2
        },
        {
            TeamName: '队伍2',
            TeamScore: 3
        }
    ])

    console.log(TeamData)

    // 关于得分变更
    const onScoreChange = (teamId: number | string, currentScore: number, getScore: number) => {
        console.log(teamId, currentScore, getScore)
    }

    return (
        <div className="game-info">
            {/*关于back点击*/}
            {/*<FloatingBackCard className="game-back" onBackClick={handleBackClick}></FloatingBackCard>*/}

            <GameInfoHeader name="2024春季篮球联赛" time="2022-12-12 12:12:12" status={2}>
                {/*右侧按钮区域*/}
                <div className="game-config">
                    <Button onClick={handleStartClick} icon={<CaretRightOutlined/>}>开始比赛</Button>
                    <Button onClick={handleResetClick} icon={<ReloadOutlined/>}>重置分数</Button>
                    <Button onClick={handlePauseClick} icon={<ReloadOutlined/>}>暂停比赛</Button>
                    {/*撤销操作*/}
                    <ToolTip text="撤销操作">
                        <Button onClick={() => setGameTime(1000)} icon={<UndoOutlined/>}></Button>
                    </ToolTip>
                    {/*恢复操作*/}
                    <ToolTip text="恢复操作">
                        <Button icon={<RedoOutlined/>}></Button>
                    </ToolTip>
                    {/*分享链接*/}
                    <Popover placement="bottom" content={QRCode({
                        url: 'https://www.baidu.com'
                    })}>
                        <Button icon={<LinkOutlined/>}></Button>
                    </Popover>
                </div>
            </GameInfoHeader>

            {/*内容区域*/}
            <main>
                {/*分数区域*/}
                <div className="game-content">
                    {/*队伍——A*/}
                    <TeamInfo
                        TeamInfo={TeamData[0]}
                        teamId={'team1'}
                        onScoreChange={onScoreChange}></TeamInfo>

                    {/*比赛计时展示*/}
                    <div className="game-content--time">
                        <h1>第一节</h1>
                        <p>{handleGameTime()}</p>
                    </div>

                    {/*队伍——B*/}
                    <TeamInfo
                        TeamInfo={TeamData[1]}
                        teamId={'team2'}
                        onScoreChange={onScoreChange}></TeamInfo>
                </div>
            </main>
        </div>
    )
}

export default GameInfo
