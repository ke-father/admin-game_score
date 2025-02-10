import React, { createContext, useContext } from "react";
import useAboutTime from './aboutTime.tsx'

const GameContext = createContext<ReturnType<typeof useAboutTime>>(null!)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    // 时间状态
    const gameTimeState = useAboutTime()
    // 比赛状态
    const gameState = {
        ...gameTimeState
    }

    return (
        <GameContext.Provider value={gameState}>
            { children }
        </GameContext.Provider>
    )
}

export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) throw new Error('useGame must be used within a GameProvider')

    return context
}
