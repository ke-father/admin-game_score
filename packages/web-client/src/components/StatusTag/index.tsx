import {STATUS} from '@/common/Status.ts'
import './style.scss'

interface IStatusTagProps {
    status: keyof typeof STATUS
}

const StatusTag = ({ status }: IStatusTagProps) => {
    const { bgColor, color, text, iconColor } = STATUS[status]
    const className = `status-tag tag${status}`

    return (
        <div className={className} style={{color: color, background: bgColor}}>
            <i style={{ background: iconColor }}></i>
            {text}
        </div>
    )
}

export default StatusTag
