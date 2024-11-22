import sharp from "sharp";
import {MAX_FILE_SIZE} from "../server/utils/aliyun";

/**
 * 压缩图片
 * @param imgBuffer 图片文件的buffer数据
 * @return {Promise<Buffer>} 压缩后的buffer数据
 */
const compressImg: (imgBuffer: Buffer) => Promise<Buffer> = (imgBuffer) => {
    return new Promise(async (resolve) => {
        // 压缩图片
        let buffer = await sharp(imgBuffer)
            .resize({ width: 300 }) // 这里可以根据需求调整压缩后的尺寸
            .toFormat('jpeg') // 可以选择压缩后的格式，如jpeg、png等
            .jpeg({ quality: 80 }) // 设置jpeg图片的质量，范围是1 - 100
            .toBuffer();

        buffer = (buffer.length / 1024) > MAX_FILE_SIZE ? await compressImg(buffer) : buffer

        resolve(buffer)
    })
}
