// @ts-ignore
import {Connection, MyServer} from "aprnine-websocket/server";
import DataManager from "./global/DataManager";
import path from "path";
import {WebsocketApi} from "./types/websocket-enum";
import websocketEvent from './websocket'

// 配置环境变量
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

console.log(process.env.WEBSOCKET_SERVER_PORT)

const server = new MyServer<WebsocketApi>({
    port: Number(process.env.WEBSOCKET_SERVER_PORT)
})

// 有人链接
server.on(MyServer.connection, () => {
    console.log('connection：来人了')
})

// 有人走
server.on(MyServer.disconnection, () => {
    console.log('disconnection：走人了')
})

websocketEvent(server)


export default server
