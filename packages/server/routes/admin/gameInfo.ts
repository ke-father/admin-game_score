import express from "express";
import {successResponse, failureResponse} from "../../utils/response";
import {BadRequest} from "http-errors";
import {Op} from "sequelize";

const router = express.Router();
// 获取分类模型
const {Game_category, Game_play_style} = require('../../models')

// 获取比赛分类
router.get('/category', async (req, res) => {
    try {
        // TODO 查询用户 根据用户权限获取分类 （VIP)？
        let {count, rows} = await Game_category.findAndCountAll()

        successResponse(res, '请求成功', {
            count,
            rows
        })
    } catch (e) {
        failureResponse(res, e)
    }
})

router.get('/categoryList', async (req, res) => {
    try {
        type IQuery = {
            categoryId?: number,
            id?: number,
            title?: string
        }

        let query = req.query as IQuery & { [key: string]: any }

        // 获取分页参数 当前页
        const pages = {
            // 当前页
            currentPage: Math.abs(Number(query.currentPage)) || 1,
            // 页面显示数据条数
            pageSize: Math.abs(Number(query.pageSize)) || 10
        }

        // 计算偏移量
        const offset = (pages.currentPage - 1) * pages.pageSize

        type ICondition = {
            [key: string]: any
            where?: IQuery
        }
        // 定义查询条件
        const condition: ICondition = {
            where: {},
            // 排序
            order: [['categoryId', 'asc'], ['id', 'asc']],
            // 查询查询条数 pageSize
            limit: pages.pageSize,
            // 偏移量
            offset
        }

        type IQueryType = {
            [K in keyof IQuery]: () => any;
        }

        const queryType: IQueryType = {
            categoryId: () => ({[Op.eq]: query.categoryId}),
            id: () => ({[Op.eq]: query.categoryId}),
            title: () => ({[Op.like]: `%${query.title}%`})

        }

        Object.keys(query).map(key => {
            if (key in queryType) {
                // @ts-ignore
                condition.where[key] = queryType[key]()
            }
        })

        const {count, rows} = await Game_play_style.findAndCountAll(condition as any)

        successResponse(res, '请求成功', {
            count,
            rows
        })
    } catch (e) {
        failureResponse(res, e)
    }
})

module.exports = router
