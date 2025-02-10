export default async ({ svg }: { svg: SVGSVGElement }) => {
    // 将svg转换为canvas
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const svgData = new XMLSerializer().serializeToString(svg)
    const img = new Image()

    await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    })

    // 设置canvas尺寸
    canvas.width = svg.width.baseVal.value
    canvas.height = svg.height.baseVal.value
    ctx?.drawImage(img, 0, 0)

    // 转换为blob
    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob!)
        }, 'image/png')
    })

    // 创建剪切板内容
    const clipboardItem = new ClipboardItem({
        'image/png': blob
    })

    // 写入剪切板
    await navigator.clipboard.write([clipboardItem])
}
