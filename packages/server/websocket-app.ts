// @ts-ignore
import { MyServer } from 'aprnine-websocket/server';
import DataManager from "./global/DataManager";
import path from "path";
import {WebsocketApi} from "./types/websocket-enum";
import websocketEvent from './websocket'
import UserManager from "./entity/UserManager";
import GameManager from "./entity/GameManager";
import TeamManager from "./entity/TeamManager";

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
    console.log('connection：来人了', server.connections.size)
})

// 有人走
server.on(MyServer.disconnection, (connection) => {
    console.log('disconnection：走人了')
    if (connection.userId) UserManager.Instance.removeUser(connection.userId)
})

websocketEvent(server)

export default server
