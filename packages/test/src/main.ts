import { MyClient } from 'aprnine-websocket/client';
import CommonRequest from 'aprnine-utils/src/request'
import {IRequest, WebsocketApi} from "./websocket-enum.ts";

const startButton = document.querySelector('.start')
const showTimeP = document.querySelector('.showTime')
const showDataP = document.querySelector('.showData')
const pauseButton = document.querySelector('.pause')

let status = false
let timer: any = null!
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
.then((res) => {
    console.log(res)
})
