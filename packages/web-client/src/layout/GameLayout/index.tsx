import {GameProvider} from "@/contexts/GameContext";
import {Outlet} from "react-router-dom";

export default () => {
    return (
        <GameProvider>
            <Outlet />
        </GameProvider>
    )
}
