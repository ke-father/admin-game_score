import { MyClient } from 'aprnine-websocket/client'
import CommonRequest from 'aprnine-utils/src/request'
import {IRequest, WebsocketApi} from "./websocket-enum.ts";

if (window.location.pathname === '/') {
    const request = new CommonRequest({ baseUrl: 'http://localhost:4949' })
    request.post('/main/createGame', { userId:2,
        playStyleId:1,
        categoryId:1,
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
        await client.listenMsg(WebsocketApi.UPDATE_GAME_INFO_SERVER, (data) => {
            console.log(data)
        }, this)
    })()
}


