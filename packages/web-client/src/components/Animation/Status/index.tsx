import {forwardRef, useImperativeHandle, useState} from 'react'
import './index.scss'

export interface IStatusProps {
    initStatus?: number
    type?: 'ASC' | 'DESC'
}
export interface IStatusRef {
    // 添加状态
    addStatus: () => number
    // 重置状态
    resetStatus: (currentStatus: number) => number
}
export default forwardRef<IStatusRef, IStatusProps>(function ({initStatus = 0, type = 'ASC'}, ref) {
    let [status, setStatus] = useState(initStatus)

    useImperativeHandle(ref, () => ({
        addStatus: () => {
            type === 'ASC'
                ? setStatus(status + 1)
                : setStatus(status - 1)
            return status
        },
        resetStatus: (currentStatus: number) => {
            setStatus(currentStatus)
            return status
        }
    }))

    const statusClassName = (): string => {
        let className = 'status-item '
        if (type === 'ASC') {
            className = className + 'asc'
        } else if (type === 'DESC') {
            className = className + 'desc'
        }

        return className
    }

    return (
        <div className={`${type.toLocaleLowerCase()} status-list`}>
            {
                Array.from({length: status}).map((_,index) => (
                    <div key={index} className={statusClassName()}></div>
                ))
            }
        </div>
    )
})
