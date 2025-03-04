import createHttpError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import server from './websocket-app'
import cors from 'cors'

// 配置环境变量
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const express = require("express")
const indexRouter = require("./routes/index")
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置跨域
app.use(cors({
  origin: '*'
}))

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req: any, res: any, next: any) => {
  next(createHttpError.NotFound);
});

// error handler
// @ts-ignore
app.use((err: any, req: any, res: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 启动websocket服务
server.start()
    .then(() => console.warn(`[Websocket] WebSocket Server started at ${process.env.WEBSOCKET_SERVER_PORT}`))

module.exports = app;
