

// 监听资源加载进度
const observer = new PerformanceObserver((list) => {
    console.log(list)
})

observer.observe({ entryTypes: ['resource'] })

// 获取页面加载过的资源
const resources = window.performance.getEntriesByType('resource');
console.log(resources)

export default () => {
    return (
        <div>loading</div>
    )
}
