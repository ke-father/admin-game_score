import React, { createContext, useContext } from "react";
import useAboutTime from './aboutTime.ts'
import useAboutState from './aboutState.ts'
import useAboutFoul from './aboutFoul.ts'

type IAboutTime = ReturnType<typeof useAboutTime>
type IGameContext = {
    constructorState: <T>(team: T[]) => T[]
} & IAboutTime
const GameContext = createContext<IGameContext>(null!)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    // 时间状态
    const gameTimeState = useAboutTime()

    const constructorState: <T>(team: T[]) => T[] = (team) => {
        return team.map((item) => ({
            ...item,
            fouls: useAboutFoul(),
            pauseState: useAboutState()
        }))
    }
    // 比赛状态
    const gameState = {
        ...gameTimeState,
        constructorState,
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
