const crypto = require('crypto');

// 生成10位数id
export function generate10DigitId(): number {
    return crypto.randomBytes(5).toString('hex').slice(0, 10);
}
