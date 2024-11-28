import { MyClient } from 'aprnine-websocket/client';
import CommonRequest from 'aprnine-utils/src/request'
import {IRequest, WebsocketApi} from "./websocket-enum.ts";

console.log(window.location.pathname)

if (window.location.pathname === '/') {
    const request = new CommonRequest({ baseUrl: 'http://localhost:4949' })
    request.post<IRequest[WebsocketApi.INIT_GAME]>('/main/createGame', { userId:2,
        playStyleId:1,
        teams: [{
        teamName: '主场队伍',
        }, {
        teamName: '客场队伍'
    }],
        sectionsNumber: 1,
        gameName:'test' })
        .then((res: any) => {
            openWs(res.data.game)
        })

    let status = false

    const client = MyClient.Instance
    client.baseUrl = 'ws://localhost:5000'

    const openWs = async (game: any) => {
        console.log(game.gameId)
        await client.connect()
        status = true
        await client.callApi<WebsocketApi.JOIN_GAME, IRequest[WebsocketApi.JOIN_GAME]>(WebsocketApi.JOIN_GAME, {
            userId: 2,
            gameId: game.gameId
        })

    }

    const button = document.querySelector('button') as HTMLButtonElement
    button.addEventListener('click', async () => {
        if (!status) return
        await client.callApi(WebsocketApi.UPDATE_GAME_INFO_CLIENT, {
            userId: 2,
            gameId: 1,
            gameInfo: {
                gameName: '测试'
            }
        })
    })

    console.log(MyClient)
}

// 观众
if (window.location.pathname === '/watch') {
    (async () => {
        const client = MyClient.Instance
        client.baseUrl = 'ws://localhost:5000'
        await client.connect()
        await client.callApi<WebsocketApi.JOIN_GAME, IRequest[WebsocketApi.JOIN_GAME]>(WebsocketApi.JOIN_GAME, {
            userId: 2,
            gameId: 1
        })
        await client.listenMsg(WebsocketApi.UPDATE_GAME_INFO_SERVER, (data: GameInfoData) => {
            console.log(data)
        }, this)
    })()
}

// 添加类型定义
interface GameInfoData {
    // 根据你的实际数据结构定义
    gameName: string;
    gameId: number;
    // ... 其他属性
}


