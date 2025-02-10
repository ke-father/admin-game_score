import {Button, Card} from "antd";
import QRCodeGenerate from "@components/QRCode/QRCodeGenerate.tsx";
import {useRef} from "react";
import CopyToClipBoard from "@utils/image/CopyToClipBoard.ts";
import Notification from "@components/Notification";

interface QRCodeCardProps {
    url: string;
    title?: string;
    logo?: string;
    downloadName?: string;
}

const QRCode: React.FC<QRCodeCardProps> = (
    {
        url,
        title = '分享链接',
        logo,
        downloadName = 'qrcode'
    }
) => {
    const qrRef = useRef<HTMLDivElement>(null!);
    const notification = new Notification()
    const contextHolder = notification.contextHolder

    // 复制二维码
    const copyQRCode = async () => {
        try {
            const svg = qrRef.current?.querySelector('svg');
            console.log(svg)
            if (!svg) return
            await CopyToClipBoard({
                svg
            })
            notification.success({
                description: '复制成功！'
            })
        } catch (e) {
            console.log(e)
        }
    }

    // 下载二维码
    const handleDownload = () => {
        const svg = qrRef.current?.querySelector('svg');
        if (!svg) return
        // 创建 Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();

        // 设置 Canvas 尺寸
        canvas.width = svg!.width.baseVal.value;
        canvas.height = svg!.height.baseVal.value;

        img.onload = () => {
            ctx?.drawImage(img, 0, 0);
            // 转换为图片并下载
            const link = document.createElement('a');
            link.download = `${downloadName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    };


    return (
        <Card className="qrcode-card" title={title}>
            <div className="qrcode-container" ref={qrRef}>
                <QRCodeGenerate
                    url={url}
                    size={200}
                    level="H"
                    imageSettings={logo ? {
                        src: logo,
                        height: 40,
                        width: 40,
                        excavate: true
                    } : undefined}
                />
            </div>

            {contextHolder}
            <Button
                type="primary"
                className="download-btn"
                onClick={copyQRCode}
            >
                复制二维码
            </Button>
            <Button
                type="primary"
                className="download-btn"
                onClick={handleDownload}
            >
                下载二维码
            </Button>
        </Card>
    )
}

export default QRCode
