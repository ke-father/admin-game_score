interface FloatingBackCardProps {
    onBackClick: () => void
    [key: string]: any
}

const FloatingBackCard = ({ onBackClick, className }: FloatingBackCardProps) => {
    const handleBackClick = () => {
        onBackClick()
    }

    return (
        <div className={className}>
            <button onClick={handleBackClick}>返回</button>
        </div>
    )
}

export default FloatingBackCard
