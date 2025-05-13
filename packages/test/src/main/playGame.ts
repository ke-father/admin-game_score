import { MyClient } from 'aprnine-websocket/client';
import CommonRequest from 'aprnine-utils/src/request'
import {IRequest, WebsocketApi} from "../websocket-enum.ts";
export const playGame = () => {
// 创建比赛按钮
    const createButton = document.querySelector('.createGame')
// 开始比赛按钮
    const startButton = document.querySelector('.start')
// 显示时间
    const showTimeP = document.querySelector('.showTime')
// 显示数据
    const showDataP = document.querySelector('.showData')
// 暂停按钮
    const pauseButton = document.querySelector('.pause')
// 增加按钮
    const increase = document.querySelector('.increase')
// 减少按钮
    const decrease = document.querySelector('.decrease')

    let status = false
    let timer: any = null!
    let date: number = 1000

// 链接
    const client = MyClient.Instance
    client.baseUrl = 'ws://localhost:5000'
    const contactWS = async () => {

        await client.connect()
    }


    const request = new CommonRequest({ baseUrl: 'http://localhost:4949' })
    const createGame = () => {
        return request.post<IRequest[WebsocketApi.INIT_GAME]>('/main/game/create', { userId:2,
            playStyleId:1,
            teams: [{
                teamName: '主场队伍',
            }, {
                teamName: '客场队伍'
            }],
            sectionsNumber: 1,
            gameName:'test' })

    }

    let gameInfo: any = {}
    createButton.addEventListener('click', async () => {
        const { data } = await createGame()
        gameInfo = data
        await contactWS()
    })

    startButton.addEventListener('click', () => {
        client.sendMsg(WebsocketApi.JOIN_GAME, { userId: 2, gameId: gameInfo.game.id })
    })

    console.log(location.pathname)

}
