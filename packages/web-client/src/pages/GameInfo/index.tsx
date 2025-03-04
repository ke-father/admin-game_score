import { useLocation, useNavigate, useSearchParams, useParams } from 'react-router-dom'
// import FloatingBackCard from "@components/FloatingBackCard";
import StatusTag from "@components/StatusTag";
import './style.scss'
import {Button, Popover} from "antd";
import {CaretRightOutlined, LinkOutlined, RedoOutlined, ReloadOutlined, UndoOutlined} from "@ant-design/icons";
import {TeamInfo, ITeamInfo} from './TeamInfo.tsx'
import ToolTip from "@components/ToolTip";
import {formatGameTime} from "@utils/formate.ts";
import useGameHandler from './handler.ts'
import { useGame, GameProvider } from "@/contexts/GameContext";
import QRCode from "@components/QRCode";


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

    const TeamData: {
        [key: string]: ITeamInfo
    } = {
        team1: {
            TeamName: '队伍1',
            TeamScore: 2
        },
        team2: {
            TeamName: '队伍2',
            TeamScore: 3
        }
    }

    // 关于得分变更
    const onScoreChange = (teamId: number | string, currentScore: number, getScore: number) => {
        console.log(teamId, currentScore, getScore)
    }

    return (
        <GameProvider>
            <div className="game-info">
                {/*关于back点击*/}
                {/*<FloatingBackCard className="game-back" onBackClick={handleBackClick}></FloatingBackCard>*/}

                {/*顶部*/}
                <header>
                    {/*左侧名称与比赛状态*/}
                    <div className="game-name">
                        {/*名称*/}
                        <div className="title">2024春季篮球联赛</div>

                        {/*底部状态与时间*/}
                        <div className="status">
                            {/*状态*/}
                            <StatusTag status={2}></StatusTag>
                            {/*时间*/}
                            <div className="status-time">
                                <span>比赛时间：</span>
                                <span>2022-12-12 12:12:12</span>
                            </div>
                        </div>
                    </div>

                    {/*右侧按钮区域*/}
                    <div className="game-config">
                        <Button onClick={handleStartClick} icon={<CaretRightOutlined />}>开始比赛</Button>
                        <Button onClick={handleResetClick} icon={<ReloadOutlined />}>重置分数</Button>
                        <Button onClick={handlePauseClick} icon={<ReloadOutlined />}>暂停比赛</Button>
                        {/*撤销操作*/}
                        <ToolTip text="撤销操作">
                            <Button onClick={() => setGameTime(1000)} icon={<UndoOutlined />}></Button>
                        </ToolTip>
                        {/*恢复操作*/}
                        <ToolTip text="恢复操作">
                            <Button icon={<RedoOutlined />}></Button>
                        </ToolTip>
                        {/*分享链接*/}
                        <Popover placement="bottom" content={QRCode({
                            url: 'https://www.baidu.com'
                        })}>
                            <Button icon={<LinkOutlined />}></Button>
                        </Popover>
                    </div>
                </header>

                {/*内容区域*/}
                <main>
                    {/*分数区域*/}
                    <div className="game-content">
                        {/*队伍——A*/}
                        <TeamInfo
                            TeamInfo={TeamData['team1']}
                            teamId={'team1'}
                            onScoreChange={onScoreChange}></TeamInfo>

                        {/*比赛计时展示*/}
                        <div className="game-content--time">
                            <h1>第一节</h1>
                            <p>{handleGameTime()}</p>
                        </div>

                        {/*队伍——B*/}
                        <TeamInfo
                            TeamInfo={TeamData['team2']}
                            teamId={'team2'}
                            onScoreChange={onScoreChange}></TeamInfo>
                    </div>

                    <div className="game-handler"></div>
                </main>
            </div>
        </GameProvider>
    )
}

export default GameInfo
