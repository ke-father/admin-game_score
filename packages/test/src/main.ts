import { MyClient } from 'aprnine-websocket/client';
import CommonRequest from 'aprnine-utils/src/request'
import {IRequest, WebsocketApi} from "./websocket-enum.ts";

const startButton = document.querySelector('.start')
const showTimeP = document.querySelector('.showTime')
const showDataP = document.querySelector('.showData')
const pauseButton = document.querySelector('.pause')

let status = false
let timer: number = null!
let date: number = 1000

startButton!.addEventListener('click', async () => {
    status = true
    timer = setInterval(() => {
        let showTime = Number(showTimeP!.textContent)
        showTime += 1000
        date = showTime
        showTimeP!.textContent = showTime.toString()
    }, 1000)
})

pauseButton!.addEventListener('click', () => {
    status = false
    clearInterval(timer)
})



const client = MyClient.Instance
client.baseUrl = 'ws://localhost:5000'
await client.connect()



if (window.location.pathname === '/') {
    if (!status) {
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
            .then(async () => {
                await openWs()
            })

        let status = false

        const openWs = async () => {
            status = true
            await client.callApi<WebsocketApi.JOIN_GAME, IRequest[WebsocketApi.JOIN_GAME]>(WebsocketApi.JOIN_GAME, {
                userId: 2,
                gameId: 1
            })
            await client.listenMsg(WebsocketApi.UPDATE_TEAM_DATA_SERVER, (data: any) => {
                console.log(data)
                // @ts-ignore
                showDataP.textContent = data.score
            }, this)
        }

        const testButton = document.querySelector('.test') as HTMLButtonElement
        testButton.addEventListener('click', async () => {
            if (!status) return
            await client.callApi(WebsocketApi.UPDATE_GAME_INFO, {
                userId: 2,
                gameId: 1,
                gameInfo: {
                    gameName: '测试'
                }
            })
        })

        const rememberButton = document.querySelector('.remember')
        rememberButton!.addEventListener('click', async () => {
            if (!status) return
            await client.callApi<WebsocketApi.UPDATE_TEAM_DATA, IRequest[WebsocketApi.UPDATE_TEAM_DATA]>(WebsocketApi.UPDATE_TEAM_DATA, {
                teamId: 10086,
                userId: 2,
                gameId: 1,
                score: 3,
                time: date,
                periods: 0,
            })
        })
    }
}

const logData = (data: any) => {
    console.log(data)
}

const logTeamData = (data: any) => {
    console.log(data)
    // @ts-ignore
    showDataP.textContent = data.score
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
        client.listenMsg(WebsocketApi.UPDATE_GAME_INFO_SERVER, logData, this)
        client.listenMsg(WebsocketApi.UPDATE_TEAM_DATA_SERVER, logTeamData, this)
    })()
}
