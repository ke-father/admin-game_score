import { createClient } from 'redis'
import logger from './logger'

let client;

// 初始化redis客户端
const redisClient = async () => {
    if (client) return client

    client = await createClient({
        socket: {
            port: 6380
        }
    })
        .on('error', error => logger.error('Redis 连接失败', error))
        .connect()
}

/**
 * 存入数组或对象，并可选地设置过期时间
 * @param key
 * @param value
 * @param ttl
 * @return {Promise<void>}
 */
export const setKey = async (key, value, ttl = null) => {
    if (!client) await redisClient()
    value = JSON.stringify(value)
    await client.set(key, value)

    if (ttl !== null) {
        await client.expire(key, ttl)
    }
}

export const getKey = async (key) => {
    if (!client) return redisClient()
    const value = await client.get(key)
    return value ? JSON.parse(value) : null
}

// 清除缓存数据
export const delKey = async (key) => {
    if (!client) return redisClient()
    await client.del(key)
}

// 匹配模式获取所有键名
export const getKeysByPattern = async (pattern) => {
    if (!client) return redisClient()
    return await client.keys(pattern)
}

// 清空所有缓存
export const flushAll = async () => {
    if (!client) await redisClient()
    await client.flushAll()
}
