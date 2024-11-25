import { MyServer } from "aprnine-websocket";
import path from "path";

// 配置环境变量
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

console.log(process.env.WEBSOCKET_SERVER_PORT)

const server = new MyServer({
    port: Number(process.env.WEBSOCKET_SERVER_PORT)
})

// 有人链接
server.on(MyServer.connection, () => {
    console.log('connection：来人了')
})

server.on(MyServer.disconnection, () => {
    console.log('disconnection：走人了')
})

export default server
