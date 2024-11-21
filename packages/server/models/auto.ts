// @ts-nocheck
const config = require('../config/config.json');
const sequelizeAuto = require('sequelize-auto');
const path = require('path')

// 配置环境变量
require('dotenv').config({
    path: path.resolve(__dirname, '../../../.env')
});

const auto = new sequelizeAuto('game_score', 'root', process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql', // 根据实际数据库类型调整
    directory: './', // 生成模型文件存放的目录
    additional: {
        timestamps: false // 可以设置是否添加默认的时间戳字段等额外参数
    }
});

auto.run((err: any) => {
    if (err) {
        console.log(err);
    } else {
        console.log('模型文件生成成功');
    }
});
