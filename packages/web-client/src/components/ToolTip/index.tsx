import {Tooltip} from "antd";
import {forwardRef} from "react";

interface IToolTipProps {
    children: React.ReactNode,
    text?: string,
    color?: ''
}

const ToolTip = forwardRef<{}, IToolTipProps>(function ({ children, text }) {
    const color = 'orange'
    // const key = ''

    return (
        <Tooltip title={text} color={color} key={color} >
            { children }
        </Tooltip>
    )
});

export default ToolTip
