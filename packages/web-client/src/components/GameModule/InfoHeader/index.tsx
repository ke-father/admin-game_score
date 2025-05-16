import StatusTag from "@components/StatusTag";
import {forwardRef} from "react";

interface IInfoHeader {
    children?: React.ReactNode
    name: string
    time: string
    status: 0 | 1 | 2 | 3
}

export default forwardRef<{}, IInfoHeader>(({ children, name, time, status }) => {
    return (
        <header>
            {/*左侧名称与比赛状态*/}
            <div className="game-name">
                {/*名称*/}
                <div className="title">{name}</div>

                {/*底部状态与时间*/}
                <div className="status">
                    {/*状态*/}
                    <StatusTag status={status}></StatusTag>
                    {/*时间*/}
                    <div className="status-time">
                        <span>比赛时间：</span>
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            { children }
        </header>
    )
})
