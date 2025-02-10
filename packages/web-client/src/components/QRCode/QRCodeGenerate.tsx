import React from "react";
import {QRCodeSVG} from "qrcode.react";

interface QRCodeProps {
    // 链接
    url: string;
    size?: number;
    // 等级
    level?: 'L' | 'M' | 'Q' | 'H';
    marginSize?: number;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        excavate: boolean;
    };
}

const QRCodeGenerate: React.FC<QRCodeProps> = (
    {
        url,
        size = 128,
        level = 'L',
        marginSize = 6,
        imageSettings
    }
) => {
    return (
        <QRCodeSVG
            value={url}
            size={size}
            level={level}
            marginSize={marginSize}
            imageSettings={imageSettings}
        ></QRCodeSVG>
    )
}

export default QRCodeGenerate
